import React,{useRef,useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Layout from '../components/layout/layout';
import DetailedFloorPlanTemplate from '../templates/DetailedFloorPlanTemplate/DetailedFloorPlanTemplate';
import useTimeout from '../UTILS/useTimeout';
import { setAirtablecustomizationAction,customizationAction } from '../store/actions/customization';

import { selectionCategoryFullNames, selectionFieldTypes, selectionCategoryNames } from '../db/custumizationGroupsFairmont';
import {HOME_TYPE} from "../UTILS/filterSelectFloorplan"
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

const DetailedFloorPlan = () => {
    const totalRecords = useRef([])
    let manufacturerData = useRef({})
    const dispatch = useDispatch()
    const [isLoading,setIsLoading]=useState(false)

    const selectorPlan = useSelector(state => state.lot.planData);
    const data=useSelector(state => state);
    useTimeout();

    const handleFetch = async(offsetId) => {
    let url 
    if(selectorPlan?.HomeType===HOME_TYPE.MODULAR){
        url = `https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Selection%20Options%20(MOD)`
    }
    else if(selectorPlan?.HomeType ===HOME_TYPE.HUDDW){
        url ="https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Selection%20Options%20(HUD)"
    }
    setIsLoading(true)
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
                dispatch(customizationAction(manufacturerData.current[selectorPlan?.Manufacturer]));
                setIsLoading(false)

          }
        }
    
        useEffect(() => {
            handleFetch()
        }, [])

    return (
        <Layout showDisclaimer>
            <DetailedFloorPlanTemplate
                selectorPlan={selectorPlan}
                isLoading={isLoading}
            />
        </Layout>
    );
};

export default DetailedFloorPlan;