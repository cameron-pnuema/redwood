import React, { useEffect, useRef } from 'react';
import styles from './HomeTemplate.module.scss';
import bgImg from '../../assets/img/homePage/bgHomePage.jpg';
import Button from '../../components/UI/Button/Button';
import Router from 'next/router';
import { setLot } from '../../store/actions/lotAction';
import { floorplanAction } from '../../store/actions/floorplan';
import slots from '../../db/slots';
import { useDispatch } from 'react-redux';
import table from 'airtable'
import _ from 'lodash'

const HomeTemplate = () => {
    const totalRecords = useRef([])
    let manufacturerData = useRef({
        
    })

    //setting a default slot as we are not showing all the slots.
    const slotData = slots[0]
    const dispatch = useDispatch()

    const gotoFloorPlan = () => {
        dispatch(setLot(slotData));
        dispatch(floorplanAction({ width: slotData.width, length: slotData.length }));
        Router.replace('/select_floorplan');
    }

    // {
    //     category: 1,
    //     active: true,
    //     name: "Exterior",
    //     underCategories: [
    //       {
    //         id: 1,
    //         name: `Roof Pitch`,
    //         active: null,
    //         options: [
    //           { id: 1, name: `"5/12"`, price: 0 },
    //           { id: 2, name: `"7/12"`, price: 5000 },
    //         ],
    //       },

    const handleFetch = async(offsetId) => {
    
    let url = `https://api.airtable.com/v0/apprGy8I7xUg9pFUu/Selection%20Options`

    if(offsetId){
        url = url + `?offset=${offsetId}`
    }else{
        totalRecords.current = []
    }
    const res = await fetch(url, { 
        method: 'get', 
        headers: new Headers({
          'Authorization': "Bearer keyybLhK60Knqwrh2", 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })

      const realRes = await res.json()

      totalRecords.current = [...totalRecords.current, ...realRes.records]

      if(realRes.offset){
        handleFetch(realRes.offset)
      }else{
        let mainOptionIndex = 0
        let mainCategoryIndex = 0

        var result = _(totalRecords.current)
            .groupBy(x => x.fields.manufacturer)
            .map((group, groupIndex) => {
                
                const buildingManufacturerName = group[0]?.fields.manufacturer
                mainCategoryIndex = 0
                let a = []
                
                
                 _(group).groupBy(x=> x.fields.pageName).map((pageGroup, pageNameIndex) => {

                    let mainOption = {
                        category: 1,
                        active: true,
                        name: "",
                        underCategories: [],
                        manufacturerName: ''
                    }

                    mainOption.category = mainCategoryIndex + 1
                    mainOption.active = mainCategoryIndex  === 0 ? true : false
                    mainOption.name = pageNameIndex
                    mainOption.manufacturerName = buildingManufacturerName

                    mainOptionIndex = 0
                    _(pageGroup).groupBy(x => x.fields.category).map((categoryGroup, categoryName, cateIndex, index) => {


                        let item = {
                            id: 1,
                            name: '',
                            active: null,
                            options: [
                            //   { id: 1, name: '', price: 0 },
                            ],
                          }

                          item.id = mainOptionIndex + 1
                          item.name = categoryName

                       categoryGroup.sort((a, b) => (a.fields?.price || 0) - (b.fields?.price) || 0 ).
                       map((mainOption, mainIndex) => {
                            item.options.push({
                                id: mainIndex +1,
                                name: mainOption.fields.selectionOption,
                                price: mainOption.fields.price || 0
                            })
                        })

                        mainOptionIndex =+ mainOptionIndex + 1
                        mainOption.underCategories.push(item)

                        
                        return categoryGroup
                    }).value()

                    a.push(mainOption)
                    
                    mainCategoryIndex =+ mainCategoryIndex + 1
                }).value()

                manufacturerData.current[buildingManufacturerName] = a

                return group
            })
            .value();


            console.log(manufacturerData.current,'resultresultresultresult');
      }
    }

    useEffect(() => {
        handleFetch()
    }, [])

    // console.log(process.env.NEXT_PUBLIC_APP_ENVIRONMENT, 'process.env.NEXT_PUBLIC_APP_ENVIRONMENT');
    // console.log(process.env.APP_ENVIRONMENT, 'process.env.APP_ENVIRONMENT');


    return (
        <div className={styles.HomeTemplate}>
            <img className={styles.HomeTemplate__img} src={bgImg} alt="bgImg" />
            <div className={styles.HomeTemplate__background}></div>

            <div className={styles.HomeTemplate__centerBlock}>
                <p className={styles.HomeTemplate__title}>Welcome! {/* {process.env.NEXT_PUBLIC_APP_ENVIRONMENT} */}</p>
                <p className={styles.HomeTemplate__subTitle}>TO GS COURTYARD HOMES  {/* {process.env.APP_ENVIRONMENT} */}</p>
                <div className={styles.HomeTemplate__wrapButton}>
                    <Button
                        text='Click here to build your next home'
                        onclick={gotoFloorPlan}
                        style={{ height: '70px' }}
                    />
                </div>
            </div>
            <div className={styles.disclaimer}>
                Please note: This application is still in early development and may be subject to bugs. Your feedback and understanding is appreciated!
            </div>
        </div>
    );
};

export default HomeTemplate;