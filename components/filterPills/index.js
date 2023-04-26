import React,{useState} from "react"
import styles from './filterPills.module.scss';
import close from "../../assets/close-red-icon.svg"


const FilterPills = ({ floorPlanFilter, handleFilterOptionClick }) => {

    return <span className={styles.filter_pill}>{floorPlanFilter.map((filter) =>
        <span className={styles.filter_pill_item}>
            <span>{filter.title} - </span>
            <span className={styles.filter_pill_label}>{filter.label}   <img src={close} alt="close" style={{width:"15px",marginBottom:"4px"}} onClick={()=> handleFilterOptionClick(filter)} /> </span>
        </span>
    )}
    </span>
}

export default FilterPills