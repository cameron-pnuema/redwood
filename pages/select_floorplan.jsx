import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/layout/layout';
import SelectFloorPlanTemplate from '../templates/SelectFloorPlanTemplate/SelectFloorPlanTemplate';
import plans from '../db/plans';
import useTimeout from '../UTILS/useTimeout';
import ApplyForm from '../components/applyForm/ApplyForm';
import { setUserInforModal } from '../store/actions/popup';
import { getMarkup, getFloorPlan, getConstructionCost } from "../store/actions/priceFactor"
import FilterCriteria from "../components/filterCriteria"
import { Collapse, Container, Button } from "reactstrap"
import { floorplanFilterAction, floorplanClearFilterAction } from "../store/actions/floorplan"
import { filterSelectFloorplan } from "../UTILS/filterSelectFloorplan"
import { filterData } from "../components/filterCriteria/utils"
import FilterPills from "../components/filterPills"
const SelectFloorPlan = () => {

    useTimeout();
    const [showFilter, setShowFilter] = useState(false)
    const [filterFloorPlan, setFilterFloorPlan] = useState([])

    const selectorLot = useSelector(state => state.lot.lotData);
    const priceFactor = useSelector(state => state.priceFactor);
    const floorPlanFilter = useSelector(state => state.floorplan.filters);
    const plansSlot = useSelector(state => state.priceFactor.floorPlan.data)
   
    const dispatch = useDispatch()
    useEffect(() => {
        if (typeof window !== "undefined" && !window.sessionStorage.getItem('USER_DETAILS')) {
            dispatch(setUserInforModal(true))
        }
        dispatch(getMarkup())
        dispatch(getFloorPlan())
        dispatch(getConstructionCost())
        return () => {
            // dispatch(floorplanClearFilterAction())
        }
    }, [])
    const handleFilterClick = () => {
        setShowFilter(!showFilter)
    }
    const setUnsetFilter = (selectedOption) => {
        filterData.find(data => data.id === selectedOption.parentId).options.forEach((item) => {
            item.id === selectedOption.id ? item.isChecked = !item.isChecked : item.isChecked = false
        })
    }
    const handleFilterOptionClick = (selectedOption) => {
        setUnsetFilter(selectedOption)
        dispatch(floorplanFilterAction(selectedOption))
    }

    useEffect(() => {
        const data = filterSelectFloorplan(floorPlanFilter, plansSlot)
       
        setFilterFloorPlan(data)
    }, [floorPlanFilter,plansSlot])
    

    return (
        <Layout showDisclaimer>
            <Container>
                <Button onClick={handleFilterClick} outline color="primary">{showFilter ? "Hide Filters" : "Add Filters"}</Button>
                <FilterPills floorPlanFilter={floorPlanFilter}/>
            </Container>

            <Collapse isOpen={showFilter}>
                <FilterCriteria handleFilterOptionClick={handleFilterOptionClick} filterData={filterData} />
            </Collapse>
            <ApplyForm className="form-modal" />
            {filterFloorPlan.length ? <SelectFloorPlanTemplate
                plansSlot={filterFloorPlan} 
            /> : <h2 class="text-center">No Data Found</h2>}
        </Layout>
    );
};

export default SelectFloorPlan;