import React, { useState, useEffect } from 'react';
import styles from './heder.module.scss';
import cx from 'classnames';
import { useRouter } from 'next/router';
import backImg from '../../../assets/img/icons/back.svg';
import Router from 'next/router';



const Heder = () => {

    const router = useRouter();
    const company = router.query

    const tabs = [
        { id: 1, name: 'Select Floorplan', active: false, visit: false, link: `/${company.company}/select_floorplan` },
        { id: 2, name: 'Detailed Floorplan', active: false, visit: false, link: `/${company.company}/detailed_floorplan` },
        { id: 3, name: 'Customize Interior', active: false, visit: false, link: `/${company.company}/customize_lnterior` },
        { id: 4, name: 'Apply', active: false, visit: false, link: `/${company.company}/apply` },
    ]

    const activeTab = tabs.find(e => e.link === router.asPath);
  
    const navigate = (id) => {
       
        if (id < activeTab.id || activeTab.id === 3 && id === 4) {
            const { link } = tabs.find(e => e.id === id);
            router.replace(link);
        }
    }

    const back = () => {
        const obj = tabs.find(e => e.link === router.asPath);
        const obj1 = tabs.find(e => e.id === obj.id - 1);
        if (obj.id === 1) {
            Router.replace('/');
        } else {
            Router.replace(`${obj1.link}`);
        }
    }

    return (
        <div className={styles.Heder}>
            <span onClick={() => back()} className={styles.Heder__back}><img src={backImg} alt="img" />Back</span>
            {
                tabs.map((data) => {
                   
                    return (
                        <span
                            onClick={() => navigate(data.id)}
                            className={cx(styles.tab, {
                                [styles.active]: data.id === activeTab?.id,
                                [styles.visit]: data.id < activeTab?.id,
                                // [styles.apply]:data.link === '/apply' && activeTab.id === 4,
                            })}
                            key={data.id}>{data.name}
                        </span>
                    )
                })
            }
        </div>
    );
};

export default Heder;