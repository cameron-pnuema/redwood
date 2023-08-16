import React, { useState } from 'react';
import styles from './Form.module.scss';
import Button1 from '../../../components/UI/Button/Button';
import Router from 'next/router';
import { phoneNumberReg, isValidPhoneNumber } from '../../../UTILS/validator'
import { useRouter } from 'next/router';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const Form = ({ register, submit, isLoading, formValues = {}, handleChange }) => {

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [requiredPage, setRequiredPage] = useState();

    const router = useRouter();
    const { company } = router.query


    const handleCloseModal = () => {
        setShowWarningModal(false);
    };

    const handleConfirmNavigation=()=>{
       setShowWarningModal(false)
       Router.replace(`/${company}/detailed_floorplan`)
    }

    const { firstName, lastName, email, phoneNumber, description, city, state, zipCode, country, errors } = formValues

    const isApplyRoute = Router?.router?.pathname?.includes('apply')
    return (
        <div className={styles.Form} data-testid="form">
            <div className={styles.Form__wrapForm}>
                {!isApplyRoute &&
                    <p className={styles.Form__title}>
                        Please fill out the form before building your dream home
                    </p>
                }
                <div className={styles.row}>
                    <div className={styles.wrap}>
                        <span className={styles.label}>First Name<span className={styles.asterisk}>*</span></span>
                        <input
                            type="text"
                            name='FirstName'
                            value={firstName}
                            onChange={(e) => handleChange(e.target.value, 'firstName')}
                            data-testid="firstNameInput"
                        />
                        <span className={styles.errors} data-testid="firstNameError">{errors?.firstName}</span>
                    </div>

                    <div className={styles.wrap}>
                        <span className={styles.label}>Last Name<span className={styles.asterisk}>*</span></span>
                        <input
                            type="text"
                            name='LastName'
                            value={lastName}
                            onChange={(e) => handleChange(e.target.value, 'lastName')}
                            data-testid="lastNameInput"
                        />
                        <span className={styles.errors} data-testid="lastNameError">{errors?.lastName}</span>
                    </div>
                </div>
                <div className={styles.row}>

                    <div className={styles.wrap}>
                        <span className={styles.label}>Phone Number<span className={styles.asterisk}>*</span></span>
                        <input
                            type="tel"
                            name='phone'
                            value={phoneNumber}
                            onChange={(e) => {
                                if (isValidPhoneNumber(e.target.value)) {
                                    handleChange(e.target.value, 'phoneNumber')
                                }
                            }}
                        />
                        <span className={styles.errors} data-testid="phoneNumberError">{errors?.phoneNumber}</span>
                    </div>
                    <div className={styles.wrap}>
                        <span className={styles.label}>Email<span className={styles.asterisk}>*</span></span>
                        <input
                            type="Email"
                            name='Email'
                            value={email}
                            onChange={(e) => handleChange(e.target.value, 'email')}
                            data-testid="emailInput"
                        />
                        <span className={styles.errors} data-testid="emailError">{errors?.email}</span>
                    </div>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}>Build Site Street Address (Optional)</span>
                    <textarea
                        name="Description"
                        id=""
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => handleChange(e.target.value, 'description')}
                        data-testid="descriptionTextarea"
                    ></textarea>
                </div>
                <div className={styles.row}>

                    <div className={styles.wrap}>
                        <span className={styles.label}>City (Optional)</span>
                        <input
                            name="city"
                            id=""
                            value={city}
                            onChange={(e) => handleChange(e.target.value, 'city')}
                            data-testid="cityInput"
                        ></input>
                    </div>
                    <div className={styles.wrap}>
                        <span className={styles.label}> State (Optional)</span>
                        <input
                            name="state"
                            id=""
                            value={state}
                            onChange={(e) => handleChange(e.target.value, 'state')}
                            data-testid="stateInput"
                        ></input>
                    </div>
                </div>
                <div className={styles.row}>

                    <div className={styles.wrap}>
                        <span className={styles.label}>Zip Code (Optional)</span>
                        <input
                            name="zipCode"
                            id=""
                            value={zipCode}
                            onChange={(e) => handleChange(e.target.value, 'zipCode')}
                            data-testid="zipCodeInput"
                        ></input>
                    </div>
                    <div className={styles.wrap}>
                        <span className={styles.label}>County (Optional)</span>
                        <input
                            name="country"
                            id=""
                            value={country}
                            onChange={(e) => handleChange(e.target.value, 'country')}
                            data-testid="countryInput"
                        ></input>
                    </div>
                </div>
                {isApplyRoute &&
                    <>
                        <Button1
                            text='Click here to apply for new home'
                            style={{ height: '50px', width: '100%', marginBottom: '20px' }}
                            isLoading={isLoading}
                            onclick={submit}
                            data-testid="applyButton"
                        />

                        <Button1
                            text='Back'
                            style={{ height: '50px', width: '100%' }}
                            theme3
                            onclick={() => {
                                setShowWarningModal(true)
                            }}
                            data-testid="backButton"
                        />

                        <Modal centered={true} contentClassName="custom_modal" isOpen={showWarningModal} style={{ marginBottom: "0px", marginTop: "0px", marginLeft: "500px" }} >
                            <ModalBody style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', fontSize: "20px", fontWeight: "550", padding: "25px" }}  >
                                Your current selection options, comments, & customizations will be lost if you proceed  back to this page
                            </ModalBody>
                            <ModalFooter style={{ display: 'flex', justifyContent: 'space-around', border: 'none' }}>
                                <Button color="secondary" onClick={handleCloseModal} style={{ width: "16.2rem", fontWeight: "500", backgroundColor: "#3939ff" }}>
                                    No - Stay on the Current Page
                                </Button>
                                <Button color="primary" onClick={handleConfirmNavigation} style={{ backgroundColor: 'rgb(209, 37, 61)', fontWeight: "500" }}>
                                    Yes - Return to this Previous Page
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                }
            </div>
        </div>
    );
};

export default Form;
