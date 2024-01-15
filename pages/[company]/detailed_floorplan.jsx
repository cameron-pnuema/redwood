import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout/layout';
import DetailedFloorPlanTemplate from '../../templates/DetailedFloorPlanTemplate/DetailedFloorPlanTemplate';
import useTimeout from '../../UTILS/useTimeout';
import { setAirtablecustomizationAction, customizationAction } from '../../store/actions/customization';
import store from "../../store/index"
import { selectionCategoryFullNames, selectionFieldTypes, selectionCategoryNames } from '../../db/custumizationGroupsFairmont';
import { HOME_TYPE } from "../../UTILS/filterSelectFloorplan";
import { useRouter } from 'next/router';
import { urlObjects } from '../../UTILS/urlObjects';
import { getDisclaimer } from '../../store/actions/priceFactor';
import { personalAT } from '../../UTILS/api';



const FLOORING = 'Flooring'

const getCategoryType = (categoryName) => {
    const cName = categoryName?.split(" ")?.join('_').toLowerCase()
    if (cName == selectionCategoryFullNames.QUANTITY) {
        return selectionFieldTypes.QUANTITY
    } else if (cName == selectionCategoryFullNames.MULTIPLE_SELECT) {
        return selectionFieldTypes.SELECT_MULTIPLE
    }
    else if (cName == selectionCategoryFullNames.MULTIPLE_SELECT_LF) {

        return selectionFieldTypes.SELECT_MULTIPLE_LF
    }
    else if (cName == selectionCategoryFullNames.SELECT_ONE_LF) {
        return selectionFieldTypes.SELECT_ONE_LF
    }

    return null
}

const getCategoryName = (airtableCategoryName) => {
    let categoryName = ''
    const keys = Object.keys(selectionCategoryNames)
    keys.map(key => {
        if (airtableCategoryName?.toLowerCase()?.split(" ")?.join("").includes(selectionCategoryNames[key].toLowerCase())) {
            categoryName = selectionCategoryNames[key]
        }
    })

    return categoryName
}



const DetailedFloorPlan = () => {

    const totalRecords = useRef([])
    let manufacturerData = useRef({})
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const selectorPlan = useSelector(state => state.lot.planData);
    const homeLength = useSelector((state) => state.lot.planData?.homeLength);

    const router = useRouter()
    const companyName = router.query.company

    //  console.log("company",companyName)



    const dynamicUrl = urlObjects[companyName]


    const homeSeries = selectorPlan?.homeSeriesName
    const disclaimerData= useSelector(state => state.priceFactor.disclaimer.data);

    const modifiedItems = disclaimerData?.map((item) => ({
        Name: item.fields.Name,
        disclaimer: item.fields.disclaimer,
      }));
   
console.log("modified",modifiedItems)
    useTimeout();

    const data = store().getState().priceFactor.constructionCost.data;

    const variableCost = data?.filter((item) => item.fields.displayStatus === "Variable Cost");

    const transformedItems = variableCost?.map((item, index) => {
        const price = selectorPlan?.homeType === "Modular" ? item.fields.constructionOptionsMOD :
            selectorPlan?.homeType === "HUD_DW" ? item.fields.constructionOptionsHUD_DW
                : item.fields.constructionOptionsHUD_SW


        const sqFt = selectorPlan?.["sq Ft"];

        return {
            id: index + 1,
            name: item.fields?.constructionSelectionName,
            price: price !== null && sqFt !== null && sqFt !== undefined
                ? price < 50 && sqFt ? price * sqFt : price
                : price,
            category: item.fields?.category,
        };
    });


    const handleFetch = async (offsetId) => {
        let url


        if (selectorPlan?.homeType === HOME_TYPE.MODULAR) {
            url = dynamicUrl.selectOptionMOD
        }
        else if (selectorPlan?.homeType === HOME_TYPE.HUDDW) {
            url = dynamicUrl.selectOptionHUD_DW
        }
        else if (selectorPlan?.homeType === HOME_TYPE.HUDSW) {
            url = dynamicUrl.selectOptionHUD_SW
        }
        setIsLoading(true)

        if (offsetId) {
            url = url + `?offset=${offsetId}`
        } else {
            totalRecords.current = []
        }
        const res = await fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization':  `Bearer ${personalAT}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })

        const realRes = await res.json()

        totalRecords.current = [...totalRecords.current, ...realRes.records]

        totalRecords.current = totalRecords.current.filter((record) => {
            return record.fields?.homeSeriesName === `${homeSeries}`
                && record.fields?.displayStatus === "On"
        })

        if (realRes.offset) {
            handleFetch(realRes.offset)
        } else {

            let mainOptionIndex = 0

            var result = _(totalRecords.current)
                .groupBy(x => x.fields.manufacturerName)
                .map((group, groupIndex) => {

                    let a = []

                    const buildingManufacturerName = group[0]?.fields.manufacturerName
                    _(group).groupBy(x => x.fields.pageName).map((pageGroup, pageNameIndex) => {

                        let mainOption = {
                            category: 1,
                            active: true,
                            name: "",
                            underCategories: [],
                            manufacturerName: ''
                        }

                        const pageNumber = pageGroup[0]?.fields?.pageNumber;

                        mainOption.category = pageNumber;
                        mainOption.active = pageNumber === 1 ? true : false
                        mainOption.name = pageNameIndex
                        mainOption.manufacturerName = buildingManufacturerName

                        mainOptionIndex = 0
                        _(pageGroup).groupBy(x => x.fields.categoryText).map((categoryGroup, categoryName, cateIndex, index) => {

                            const matchingItem = modifiedItems.find(item => item.Name == categoryName);

                            console.log("matchinfititi",matchingItem?.disclaimer,categoryName)
                            let item = {
                                id: 1,
                                name: '',
                                active: null,
                                options: [
                                ],
                                disclaimer: matchingItem ? matchingItem.disclaimer : '',
                            }

                            item.id = mainOptionIndex + 1
                            item.name = categoryName

                            categoryGroup.sort((a, b) => (a.fields?.price || 0) - (b.fields?.price) || 0).
                                map((mainOption, mainIndex) => {
                                    let itemObject = {}
                                    if (categoryName === FLOORING) {
                                        itemObject = {
                                            id: 1,
                                            name: `inputName`,
                                            type: 'textarea',
                                            active: 1,
                                            price: 0,
                                            value: "",
                                        }
                                    } else {
                                        itemObject = {
                                            id: mainIndex + 1,
                                            name: mainOption.fields.selectionOptionDisplay,
                                            price: mainOption.fields.price || 0,
                                            displayStatus: mainOption.fields?.displayStatus,
                                            homeSeriesName: mainOption.fields?.homeSeriesName
                                        }

                                    }
                                    if (categoryName.includes('Optional')) { //if the category is optional then let the user to skip it
                                        item.active = 0

                                    }

                                    if (categoryName.includes('Roof Pitch')) {
                                        item.active = 1
                                    }

                                    if (getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.QUANTITY) {
                                        itemObject.categoryType = selectionFieldTypes.QUANTITY
                                        item.categoryType = selectionFieldTypes.QUANTITY
                                        itemObject.noOfUnit = 0

                                    } else if (getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.SELECT_MULTIPLE) {
                                        itemObject.categoryType = selectionFieldTypes.SELECT_MULTIPLE
                                        item.categoryType = selectionFieldTypes.QUANTITY
                                    }

                                    else if (getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.SELECT_MULTIPLE_LF) {
                                        itemObject.categoryType = selectionFieldTypes.SELECT_MULTIPLE
                                        item.categoryType = selectionFieldTypes.QUANTITY
                                        itemObject.price = itemObject.price * homeLength

                                    }
                                    else if (getCategoryType(mainOption.fields.categoryType) === selectionFieldTypes.SELECT_ONE_LF) {
                                        item.categoryType = selectionFieldTypes.SELECT_ONE_LF
                                        itemObject.price = itemObject.price * homeLength
                                    }

                                    if (item.categoryType && getCategoryName(categoryName)) {
                                        item.categoryType = getCategoryName(categoryName)
                                    }

                                    item.options.push(itemObject)
                                })

                            mainOptionIndex = + mainOptionIndex + 1
                            mainOption.underCategories.push(item)


                            return categoryGroup
                        }).value()

                        a.push(mainOption)

                    }).value()


                    const obj = {
                        category: a.length + 1,
                        active: false,
                        name: "Variable Cost",
                        underCategories: [],
                        manufacturerName: `${selectorPlan?.manufacturerName}`
                    }

                    const categories = [...new Set(variableCost.map(item => item.fields.category))];
                    let item
                    mainOptionIndex = 0

                    const items = categories.map((category, index) => {
                        const filteredItems = transformedItems.filter((item, index) => item.category === category);
                        const optionsCategory = { [category]: filteredItems.map(item => item) };
                        if (category.includes("Optional")) {
                            return {
                                id: index + 1,
                                name: category,
                                active: 1,
                                options: optionsCategory[category],
                                categoryType: selectionFieldTypes.QUANTITY
                            };
                        }
                        else {
                            return {
                                id: index + 1,
                                name: category,
                                active: null,
                                options: optionsCategory[category],
                            };
                        }

                    });

                    a.push({
                        ...obj,
                        underCategories: items
                    })
                    manufacturerData.current[buildingManufacturerName] = a.sort((a, b) => a.category - b.category);
                    return group
                })
                .value();

            console.log("maunfff,",manufacturerData.current)
            dispatch(setAirtablecustomizationAction(manufacturerData.current))

            dispatch(customizationAction(manufacturerData.current[selectorPlan?.manufacturerName]));

            setIsLoading(false)

        }
    }

    useEffect(() => {
        handleFetch()

        dispatch(getDisclaimer())
  
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