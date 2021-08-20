import React from 'react';
import styles from './HomeTemplate.module.scss';
import bgImg from '../../assets/img/homePage/bgHomePage.jpg';
import Button from '../../components/UI/Button/Button';
import Router from 'next/router';
import { setLot } from '../../store/actions/lotAction';
import { floorplanAction } from '../../store/actions/floorplan';
import slots from '../../db/slots';
import { useDispatch } from 'react-redux';


const HomeTemplate = () => {

    //setting a default slot as we are not showing all the slots.
    const slotData = slots[0]
    const dispatch = useDispatch()

    const gotoFloorPlan = () => {
        dispatch(setLot(slotData));
        dispatch(floorplanAction({ width: slotData.width, length: slotData.length }));
        Router.replace('/select_floorplan');
    }

    console.log(process.env.NEXT_PUBLIC_APP_ENVIRONMENT, 'process.env.NEXT_PUBLIC_APP_ENVIRONMENT');
    console.log(process.env.APP_ENVIRONMENT, 'process.env.APP_ENVIRONMENT');


    return (
        <div className={styles.HomeTemplate}>
            <img className={styles.HomeTemplate__img} src={bgImg} alt="bgImg" />
            <div className={styles.HomeTemplate__background}></div>

            <div className={styles.HomeTemplate__centerBlock}>
                <p className={styles.HomeTemplate__title}>Welcome! {process.env.NEXT_PUBLIC_APP_ENVIRONMENT}</p>
                <p className={styles.HomeTemplate__subTitle}>{process.env.customKey}TO GS COURTYARD HOMES  {process.env.APP_ENVIRONMENT}</p>
                <div className={styles.HomeTemplate__wrapButton}>
                    <Button
                        text='Click here to build your next home'
                        onclick={gotoFloorPlan}
                        style={{ height: '70px' }}
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