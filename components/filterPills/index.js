import React,{useState} from "react"
import styles from './filterPills.module.scss';
import close from "../../assets/close-red-icon.svg"


const FilterPills = ({ floorPlanFilter, handleFilterOptionClick }) => {

    return <span className={styles.filter_pill} data-testid="filter-pills" >{floorPlanFilter.map((filter ,index) =>
        
        <span className={styles.filter_pill_item} key={index} data-testid={`filter-pill-item-${index}`}>
            <span  data-testid={`filter-pill-title-${index}`}>{filter.title} - </span>
            <span className={styles.filter_pill_label}  data-testid={`filter-pill-label-${index}`}>{filter.label} 
            
          <img src={close} alt="close" style={{width:"15px",marginBottom:"4px"}} onClick={()=> handleFilterOptionClick(filter)} /> </span>
        </span>
    )}
    </span>
}

export default FilterPills