import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/layout/layout';
import SelectFloorPlanTemplate from '../templates/SelectFloorPlanTemplate/SelectFloorPlanTemplate';
import plans from '../db/plans';
import useTimeout from '../UTILS/useTimeout';
import ApplyForm from '../components/applyForm/ApplyForm';
import { setUserInforModal } from '../store/actions/popup';
import {getMarkup,getFloorPlan,getConstructionCost} from "../store/actions/priceFactor"

const SelectFloorPlan = () => {

    useTimeout();

    const selectorLot = useSelector(state => state.lot.lotData);
    const priceFactor = useSelector(state => state.priceFactor);
console.log(plans(),'qqqqqqqqqqqqqqqqq');
    const plansSlot = plans().filter(e => e.type === selectorLot?.type)
    const dispatch = useDispatch()
console.log(priceFactor,'priceFactorpriceFactor');
    useEffect(() => {
        if(typeof window !== "undefined" && !window.sessionStorage.getItem('USER_DETAILS')){
            dispatch(setUserInforModal(true))
        }
        dispatch(getMarkup())
        dispatch(getFloorPlan())
        dispatch(getConstructionCost())
    }, [])

    return (
        <Layout showDisclaimer>
            <ApplyForm/>
            <SelectFloorPlanTemplate
                plansSlot={plansSlot}
            />
        </Layout>
    );
};

export default SelectFloorPlan;