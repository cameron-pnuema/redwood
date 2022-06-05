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
import { setAirtablecustomizationAction } from '../../store/actions/customization';
import { selectionCategoryFullNames, selectionFieldTypes, selectionCategoryNames } from '../../db/custumizationGroupsFairmont';

const FLOORING = 'Flooring'

const getCategoryType = (categoryName) => {
    const cName = categoryName?.split(" ")?.join('_').toLowerCase()

    if(cName == selectionCategoryFullNames.QUANTITY){
        return selectionFieldTypes.QUANTITY
    }else if(cName == selectionCategoryFullNames.MULTIPLE_SELECT){
        return selectionFieldTypes.SELECT_MULTIPLE
    }

    return null
}

const getCategoryName = (airtableCategoryName) => {
    let categoryName = ''
    const keys = Object.keys(selectionCategoryNames)
    keys.map(key => {
        if(airtableCategoryName?.toLowerCase()?.split(" ")?.join("").includes(selectionCategoryNames[key].toLowerCase())){
            categoryName = selectionCategoryNames[key]
        }
    })

    return categoryName
}

const HomeTemplate = (categoryType) => {
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
          'Authorization': "Bearer key0AV84zSplHpV5B", 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })

      const realRes = await res.json()

      totalRecords.current = [...totalRecords.current, ...realRes.records]
      if(realRes.offset){
        handleFetch(realRes.offset)
      }else{
        let mainOptionIndex = 0

        var result = _(totalRecords.current)
            .groupBy(x => x.fields.manufacturer)
            .map((group, groupIndex) => {
                
                const buildingManufacturerName = group[0]?.fields.manufacturer
                let a = []
                
                
                 _(group).groupBy(x=> x.fields.pageName).map((pageGroup, pageNameIndex) => {

                    let mainOption = {
                        category: 1,
                        active: true,
                        name: "",
                        underCategories: [],
                        manufacturerName: ''
                    }

                    const pageNumber = pageGroup[0]?.fields?.['Page Number'];

                    mainOption.category = pageNumber;
                    mainOption.active = pageNumber === 1 ? true : false
                    mainOption.name = pageNameIndex
                    mainOption.manufacturerName = buildingManufacturerName

                    mainOptionIndex = 0
                    _(pageGroup).groupBy(x => x.fields.category).map((categoryGroup, categoryName, cateIndex, index) => {


                    let item = {
                            id: 1,
                            name: '',
                            active: null,
                            options: [
                            ],
                        }

                        item.id = mainOptionIndex + 1
                        item.name = categoryName

                       categoryGroup.sort((a, b) => (a.fields?.price || 0) - (b.fields?.price) || 0 ).
                       map((mainOption, mainIndex) => {
                           let itemObject = {}

                           if(categoryName === FLOORING){   
                            itemObject = {
                                id: 1,
                                name: `inputName`,
                                type: 'textarea',
                                active: 1,
                                price: 0,
                                value: "",
                              }
                           }else{
                            itemObject =  {
                                   id: mainIndex +1,
                                   name: mainOption.fields.selectionOption,
                                   price: mainOption.fields.price || 0
                               }
                           }

                           if(categoryName.includes('Optional')){ //if the category is optional then let the user to skip it
                                item.active = 1 
                           }

                           if(getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.QUANTITY ){
                            itemObject.categoryType = selectionFieldTypes.QUANTITY
                            item.categoryType = selectionFieldTypes.QUANTITY
                            itemObject.noOfUnit = 0

                           }else if(getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.SELECT_MULTIPLE ){
                            itemObject.categoryType = selectionFieldTypes.SELECT_MULTIPLE
                            item.categoryType = selectionFieldTypes.QUANTITY

                           }

                           if(item.categoryType && getCategoryName(categoryName)){
                                item.categoryName = getCategoryName(categoryName)
                            }

                           item.options.push(itemObject)
                        })

                        mainOptionIndex =+ mainOptionIndex + 1
                        mainOption.underCategories.push(item)

                        
                        return categoryGroup
                    }).value()

                    a.push(mainOption)

                }).value()

                manufacturerData.current[buildingManufacturerName] = a.sort((a,b) => a.category - b.category);

                return group
            })
            .value();

            dispatch(setAirtablecustomizationAction(manufacturerData.current))

      }
    }

    useEffect(() => {
        handleFetch()
    }, [])

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