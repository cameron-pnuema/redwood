import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/layout/layout';
import SelectFloorPlanTemplate from '../templates/SelectFloorPlanTemplate/SelectFloorPlanTemplate';
import plans from '../db/plans';
import useTimeout from '../UTILS/useTimeout';
import ApplyForm from '../components/applyForm/ApplyForm';
import { setUserInforModal } from '../store/actions/popup';


const SelectFloorPlan = () => {

    useTimeout();

    const selectorLot = useSelector(state => state.lot.lotData);
    const plansSlot = plans.filter(e => e.type === selectorLot?.type)
    const dispatch = useDispatch()

    useEffect(() => {
        if(typeof window !== "undefined" && !window.localStorage.getItem('USER_DETAILS')){
            dispatch(setUserInforModal(true))
        }
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