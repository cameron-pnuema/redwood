"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './HomeTemplate.module.scss';
import bgImg from '../../assets/img/homePage/bgHomePage.jpg';
import Button from '../../components/UI/Button/Button';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { setLot, setPlan } from '../../store/actions/lotAction';
import { floorplanAction } from '../../store/actions/floorplan';
import slots from '../../db/slots';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { setAirtablecustomizationAction } from '../../store/actions/customization';
import { selectionCategoryFullNames, selectionFieldTypes, selectionCategoryNames } from '../../db/custumizationGroupsFairmont';
import { toast } from 'react-toastify';
import { getMarkup, getFloorPlan, getConstructionCost, getConstructionCostNew } from "../../store/actions/priceFactor"
import { HOME_TYPE } from "../../UTILS/filterSelectFloorplan"
import { customizationAction } from "../../store/actions/customization"
import { setUserData } from "../../store/actions/user"
import { setUserInforModal } from '../../store/actions/popup';
import Popup from '../../components/UI/Popup/Popup';
import store from "../../store/index";
import { urlObjects } from '../../UTILS/urlObjects';

import { userLogOut } from '../../store/actions/user';
import Logout from '../../assets/img/selectFloorplan/icons8-logout-50.png'






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

const HomeTemplate = (categoryType) => {
    let userCompany
    if (typeof window !== 'undefined') {
        userCompany = localStorage.getItem('companyName')
    }
    const router = useRouter()
    const companyName = router.query.company || userCompany

    const dynamicUrl = urlObjects[companyName]

    const totalRecords = useRef([])
    let manufacturerData = useRef({

    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [orderID, setOrderID] = useState('')
    //setting a default slot as we are not showing all the slots.
    const slotData = slots[0]
    const dispatch = useDispatch()
    const selectorPlan = useSelector(state => state.lot.planData);


    const homeSeries = selectorPlan?.homeSeriesName
    const homeLength = useSelector((state) => state.lot.planData?.homeLength);

    const gotoFloorPlan = () => {
        dispatch(setLot(slotData));
        dispatch(floorplanAction({ width: slotData.width, length: slotData.length }));
        Router.replace(`/${companyName}/select_floorplan`);
        dispatch((setUserInforModal(true)))
    }


    const data = store().getState().priceFactor?.constructionCost.data;

    const variableCost = data?.filter((item) => item.fields?.displayStatus === "Variable Cost");

    const transformedItems = variableCost?.map((item, index) => {
        const price = selectorPlan?.homeType === "Modular" ? item.fields.constructionOptionsMOD :
            selectorPlan?.homeType === "HUD_DW" ? item.fields.constructionOptionsHUD_DW
                : item.fields.constructionOptionsHUD_SW


        return {
            id: index + 1,
            name: item.fields?.constructionSelectionName,
            price: price < 50 && selectorPlan ? price * selectorPlan?.["sq Ft"] : price,
            category: item.fields?.category
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
        if (offsetId) {
            url = url + `?offset=${offsetId}`
        } else {
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


        totalRecords.current = totalRecords.current.filter((record) => {

            return record.fields?.homeSeriesName === `${homeSeries}`
                && record.fields?.displayStatus === "On"
        })

        if (realRes.offset) {
            handleFetch(realRes.offset)
        } else {
            let mainOptionIndex = 0

            var result = _(totalRecords.current)
                .groupBy(x => x.fields.manufacturer)
                .map((group, groupIndex) => {

                    const buildingManufacturerName = group[0]?.fields.manufacturerName

                    let a = []


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
                                        itemObject.categoryType = "Optional Select One"
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
                                        item.categoryName = getCategoryName(categoryName)
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
            dispatch(setAirtablecustomizationAction(manufacturerData.current))
            Router.replace(`/${companyName}/Customize_Home`);
        }
    }


    const handleChange = (e) => {
        setOrderID(e.target.value)
    }
    const handleGetOrderDetail = async () => {
        if (!orderID) {
            return setError(true)
        }
        setLoading(true)
        setError(false)
        const url = urlObjects[companyName].orderDetail(orderID)

        const res = await fetch(url, {
            method: "get",
            headers: new Headers({
                Authorization: "Bearer key0AV84zSplHpV5B",
                'Content-Type': 'application/json'
            }),
        });


        const orderData = await res.json()
        const orderDays = orderData.records.map((item) => {
            const day = item.fields && item?.fields?.Age
            return day
        })

        if (!orderData.records.length) {
            toast.error('Please enter valid order ID!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        else if (orderData.records.length && orderDays[0] < 60) {
            const { orderInfo, userInfo, selectedPlan, orderInfo2, orderInfo3, orderInfo4 } = orderData.records[0].fields
            const lot = JSON.parse(selectedPlan)
            const order = JSON.parse(orderInfo)
            const userData = JSON.parse(userInfo)
            let order2 = [];
            let order3 = [];
            let order4 = [];

            if (orderInfo2) {
                order2 = JSON.parse(orderInfo2);
            }

            if (orderInfo3) {
                order3 = JSON.parse(orderInfo3);
            }
            if (orderInfo4) {
                order4 = JSON.parse(orderInfo4);
            }

            const combinedOrder = [...order, ...order2, ...order3, ...order4];


            order[order.length - 1].active = false
            order[0].active = true
            dispatch(setPlan(lot.planData));
            dispatch(setLot(slotData));
            dispatch(customizationAction(combinedOrder))
            dispatch(setUserData(userData))
            getAllDataOfApp()

        }
        else {
            toast.error('order ID expired!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


    const logout = () => {
        localStorage.clear()
        Router.push("/")
        dispatch(userLogOut())
    }


    const getAllDataOfApp = () => {
        Promise.all([dispatch(getMarkup()), dispatch(getFloorPlan()), dispatch(getConstructionCost()), dispatch(getConstructionCostNew())]).then((res) => {
            setLoading(false)
        })
    } 

    function capitalizeAllLetters(str) {
        return str === "fawaffordablehomes" ?
         "FAW AFFORDABLE HOMES" : "GS COURTYARD HOMES"
    }

    React.useEffect(() => {

        if (selectorPlan) {

            handleFetch()
        }
    }, [selectorPlan])

    return (
        <div className={styles.HomeTemplate}>
            <img className={styles.HomeTemplate__img} src={bgImg} alt="bgImg" />
            <div className={styles.HomeTemplate__background}>
                <div className={styles.Logout} onClick={() => logout()}>
                    <h1 >Logout</h1>
                    <img src={Logout} alt="logOut" style={{ width: "50px", height: "50px" }} />
                </div>
            </div>

            <div className={styles.HomeTemplate__centerBlock}>
                <p className={styles.HomeTemplate__title}>Welcome! {/* {process.env.NEXT_PUBLIC_APP_ENVIRONMENT} */}</p>
                <p className={styles.HomeTemplate__subTitle}>TO {companyName && capitalizeAllLetters(companyName)} {/* {process.env.APP_ENVIRONMENT} */}</p>
                <div className={styles.HomeTemplate__wrapButton} data-testid="buildButton">
                    <Button
                        text='Click here to build your next home'
                        onclick={gotoFloorPlan}
                        style={{ height: '70px' }}
                    />
                </div>
                <div className={styles.orderDetail}>
                    <p className={styles.HomeTemplate__orderText}>Get your order detail</p>

                    <input type="text" value={orderID} onChange={handleChange} className={styles.inputOrder} placeholder='Enter Order ID' data-testid="orderIDInput" />
                    {error && <p className={styles.HomeTemplate__error} data-testid="error"> * Field is required</p>}
                    <Button
                        text={loading ? "... Fetching Order" : "Get Order Detail"}
                        onclick={handleGetOrderDetail}
                        style={{ height: '40px', width: "fit-content" }}
                        data-testid="getOrderDetailButton"
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