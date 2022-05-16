import React from 'react';
import styles from  './ItemSlider.module.scss';


const ItemSlider = ({imgSlider}) => {
    return (
        <div className={styles.imgSlider}>
            <img src={imgSlider} alt="imgSlider" style={{objectFit:"contain"}}/>
        </div>
    );
};

export default ItemSlider;