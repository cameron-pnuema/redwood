import React from 'react';
import styles from './Form.module.scss';
import Button from '../../../components/UI/Button/Button';
import Router from 'next/router';
import { phoneNumberReg, isValidPhoneNumber } from '../../../UTILS/validator'

const Form = ({ register, submit, isLoading, formValues = {}, handleChange }) => {

        const { firstName, lastName, email, phoneNumber, description, errors } = formValues

        const isApplyRoute = Router?.router?.pathname?.includes('apply')

    return (
        <div className={styles.Form}>
            <div className={styles.Form__wrapForm}>
                <p className={styles.Form__title}>
                    Please Fill Out The Form Below. Since, We Require Some Information About You.
                </p>
                <div className={styles.row}>
                    <div className={styles.wrap}>
                        <span className={styles.label}>First Name<span className={styles.asterisk}>*</span></span>
                        <input
                            type="text"
                            name='FirstName'
                            value={firstName}
                            onChange={(e) => handleChange(e.target.value, 'firstName')}

                        />
                        <span className={styles.errors}>{errors?.firstName}</span>
                    </div>

                    <div className={styles.wrap}>
                        <span className={styles.label}>Last Name<span className={styles.asterisk}>*</span></span>
                        <input
                            type="text"
                            name='LastName'
                            value={lastName}
                            onChange={(e) => handleChange(e.target.value, 'lastName')}
                        />
                        <span className={styles.errors}>{errors?.lastName}</span>
                    </div>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}>Phone Number<span className={styles.asterisk}>*</span></span>
                    <input
                        type="tel"
                        name='phone'
                        value={phoneNumber}
                        onChange={(e) => {
                            if(isValidPhoneNumber(e.target.value)){
                                handleChange(e.target.value, 'phoneNumber')
                            }
                        }}
                    />
                    <span className={styles.errors}>{errors?.phoneNumber}</span>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}>Email<span className={styles.asterisk}>*</span></span>
                    <input
                        type="Email"
                        name='Email'
                        value={email}
                        onChange={(e) => handleChange(e.target.value, 'email')}
                    />
                    <span className={styles.errors}>{errors?.email}</span>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}>Anything you'd like to add?</span>
                    <textarea
                        name="Description"
                        id=""
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => handleChange(e.target.value, 'description')}
                    ></textarea>
                </div>
               {isApplyRoute && 
                <> 
                    <Button
                            text='Click here to apply for new home'
                            style={{ height: '50px', width: '100%', marginBottom: '20px' }}
                            isLoading={isLoading}
                            onclick={submit}
                        />

                    <Button
                        text='Back'
                        style={{ height: '50px', width: '100%' }}
                        theme3
                        onclick={() => Router.replace('/customize_lnterior')}
                    />
                </>
                }
            </div>
        </div>
    );
};

export default Form;
