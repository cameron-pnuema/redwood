import React from 'react';
import styles from './Form.module.scss';
import Button from '../../../components/UI/Button/Button';
import Router from 'next/router';
import { phoneNumberReg, isValidPhoneNumber } from '../../../UTILS/validator'
import { useRouter } from 'next/router';

const Form = ({ register, submit, isLoading, formValues = {}, handleChange }) => {


    const router = useRouter();
    const{company}=router.query

        const { firstName, lastName, email, phoneNumber, description, city, state, zipCode, country, errors } = formValues

        const isApplyRoute = Router?.router?.pathname?.includes('apply')
    return (
        <div className={styles.Form}>
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
                <div className={styles.row}>

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
                    ></input>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}> State (Optional)</span>
                    <input
                        name="state"
                        id=""
                        value={state}
                        onChange={(e) => handleChange(e.target.value, 'state')}
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
                    ></input>
                </div>
                <div className={styles.wrap}>
                    <span className={styles.label}>County (Optional)</span>
                    <input
                        name="country"
                        id=""
                        value={country}
                        onChange={(e) => handleChange(e.target.value, 'country')}
                    ></input>
                </div>
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
                        onclick={() => Router.replace(`/${company}/detailed_floorplan`)}
                    />
                </>
                }
            </div>
        </div>
    );
};

export default Form;
