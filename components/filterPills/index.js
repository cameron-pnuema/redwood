import React from "react"
import styles from './filterPills.module.scss';
const FilterPills = ({ floorPlanFilter }) => {
    return <span className={styles.filter_pill}>{floorPlanFilter.map((filter) =>
        <span className={styles.filter_pill_item}>
            <span>{filter.title} - </span>
            <span className={styles.filter_pill_label}>{filter.label}</span>
        </span>
    )}
    </span>
}

export default FilterPills