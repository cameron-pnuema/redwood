import React, { useState, useEffect } from 'react';
import styles from './heder.module.scss';
import cx from 'classnames';
import { useRouter } from 'next/router';
import backImg from '../../../assets/img/icons/back.svg';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../../store/actions/user';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import "../../../pages/_app"


const Heder = () => {

    const router = useRouter();
    const company = router.query

    const dispatch = useDispatch()



    const tabs = [
        { id: 1, name: 'Select Floorplan', active: false, visit: false, link: `/${company.company}/select_floorplan` },
        { id: 2, name: 'Detailed Floorplan', active: false, visit: false, link: `/${company.company}/detailed_floorplan` },
        { id: 3, name: 'Customize Home', active: false, visit: false, link: `/${company.company}/Customize_Home` },
        { id: 4, name: 'Apply', active: false, visit: false, link: `/${company.company}/apply` },
    ]

    const activeTab = tabs.find(e => e.link === router.asPath);
    const currentPage = activeTab?.name

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [requiredPage, setRequiredPage] = useState();

    const navigate = (id) => {
        if (id < activeTab.id || (activeTab.id === 3 && id === 4)) {
            if (activeTab.id === 3) {
                setShowWarningModal(true);
                setRequiredPage(id)
            } else {
                const { link } = tabs.find(e => e.id === id);
                router.replace(link);
            }
        }
    }

    const handleCloseModal = () => {
        setShowWarningModal(false);
    };

    const handleConfirmNavigation = () => {
        if (requiredPage === activeTab.id - 1) {
            const { link } = tabs.find((e) => e.id === requiredPage);
            router.replace(link);
        } else {
            setShowWarningModal(false);
            const { link } = tabs.find((e) => e.id === requiredPage);
            router.replace(link);
        }
    };;

    const back = () => {
        const obj = tabs.find((e) => e.link === router.asPath);
        const obj1 = tabs.find((e) => e.id === obj.id - 1);
        if (activeTab.id === 3) {
            setShowWarningModal(true);
            setRequiredPage(obj1.id)

        } else {

            if (obj.id === 1) {
                router.replace(`${obj.link}`);
            } else {
                router.replace(`${obj1.link}`);
            }
        }
    };

    const logout = () => {
        localStorage.clear()
        Router.push(`/`)
        dispatch(userLogOut())
    }

    return (
        <div className={styles.Heder}>
            {
                currentPage != "Select Floorplan" ? <span onClick={() => back()} className={styles.Heder__back}  data-testid="back"><img src={backImg} alt="img" />Back</span> : <span className={styles.Heder__back}></span>
            }
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
                            key={data.id}
                            data-testid={`${data.name}`}
                            >{data.name}
                           
                        </span>
                    )
                })
            }
            <span onClick={() => logout()} className={styles.Heder__back}  data-testid="logOut">Logout</span>



            <Modal centered={true} contentClassName="custom_modal" isOpen={showWarningModal} style={{ marginBottom: "0px", marginTop: "0px", marginLeft: "500px" }} >
                <ModalBody style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', fontSize: "20px", fontWeight: "550", padding: "25px" }}  >
                    Your current selection options,comments & customizations will be lost if you proceed  back to this page
                </ModalBody>
                <ModalFooter style={{ display: 'flex', justifyContent: 'space-around', border: 'none' }}>
                    <Button color="secondary" onClick={handleCloseModal} style={{ width: "16.2rem", fontWeight: "500", backgroundColor: "#3939ff" }}>
                        No-Stay on the Current Page
                    </Button>
                    <Button color="primary" onClick={handleConfirmNavigation} style={{ backgroundColor: 'rgb(209, 37, 61)', fontWeight: "500" }}>
                        Yes-Return to this Previous Page
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Heder;