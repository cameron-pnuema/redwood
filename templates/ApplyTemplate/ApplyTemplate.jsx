import React from 'react';
import styles from './ApplyTemplate.module.scss';
import bgImg from '../../assets/img/homePage/bgHomePage.jpg';
import Form from './Form/Form';
import Button from '../../components/UI/Button/Button';
import Router from 'next/router';
import { userLogOut } from "../../store/actions/user"
import { useSelector, useDispatch } from "react-redux";


const ApplyTemplate = ({ errors, register, submit, formValues, handleChange, isCompleted, isLoading, orderId }) => {

    const dispatch = useDispatch()
          
    let formContent = (
        <Form
            register={register}
            submit={submit}
            errors={errors}
            isLoading={isLoading}
            formValues={formValues}
            handleChange={handleChange}
        />
    );

    if (isCompleted) formContent = (
        <div className={styles.thankyou} data-testid="thankyouSection">
            <h3>Thank you for customizing your home! Your order number is<div data-testid="orderId">{orderId}</div></h3>
            <Button text="Restart" noArrow style={{ height: 50, width: '100%' }}  data-testid="restartButton" onclick={() => {
                dispatch(userLogOut())
                Router.replace('/')
            }} />
        </div>
    );

    return (
        <div className={styles.ApplyTemplate}>
            <div className={styles.ApplyTemplate__titleBlock}>
                <div className={styles.filter}></div>
                <img className={styles.bgImg}  data-testid="backgroundImage" src={bgImg} alt="bgImg" />
                <div className={styles.wrapTitle}>
                    <h2>Here’s what to expect next</h2>

                    <h3>STEP 1: Floor Plan & Design</h3>
                    <p>
                        Spend some time building your dream house with your sales rep. Once your design is submitted you'll
                        receive a confirmation email outlining your choices & providing you with an intial quote.
                    </p>

                    <h3>STEP 2: Finalization</h3>
                    <p>
                      We will confirm your customizations & intial quote with our manufacturer. Once approved we can address any
                     remaining before discussing financing.
                    </p>

                    <h3>STEP 3: Financing</h3>
                    <p>
                        Once your home selections are finalized we will get you connected to a lender to apply for financing.
                    </p>

                    <h3>STEP 4: Build, Deliver, & Move-In</h3>
                    <p>
                        We will get your home built, delivered, and you’ll be moved in before you know it.
                    </p>
                </div>

            </div>

            <div className={styles.ApplyTemplate__wrapForm}  data-testid="formContainer">
                {formContent}
            </div>

        </div>
    );
};

export default ApplyTemplate;
