import React from 'react'
import styles from './CustomerContactTemplate.module.scss';
import avatar from "../../assets/img/pngwing.com.png"
import bin from "../../assets/img/rubbish-bin-svgrepo-com.svg"

const CustomerContact = () => {
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h3>Customer Contact</h3>
            </div>
            <div className={styles.container}>
                <div className={styles.header2}>
                    <h3> Contact Information</h3>
                </div>
                <div className={styles.form}>
                    <div className={styles.avatar}>
                    <img src={avatar} alt="avatar" />
                    <span className={styles.avatarstatus}><p>inactive</p></span>
                    </div>

                    <div className={styles.input}>
                        <div className={styles.name}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>First Name</span>
                                <input
                                    type="text"
                                    name='FirstName'

                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Last Name</span>
                                <input
                                    type="text"
                                    name='LasttName'

                                />
                            </div>
                        </div>
                        <div className={styles.displayName}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Display Name<span className={styles.asterisk}>*</span></span>
                                <input
                                    type="text"
                                    name='DisplayName'
                                />
                            </div>
                        </div>
                        <div className={styles.streetAddress}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Street Address</span>
                                <input
                                    type="text"
                                    name='streetAddress'
                                />
                            </div>
                        </div>

                        <div className={styles.location}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>City</span>
                                <input
                                    type="text"
                                    name='city'
                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>State</span>
                                <input
                                    type="text"
                                    name='state'
                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Zip Code</span>
                                <input
                                    type="text"
                                    name='zipCode'
                                />
                            </div>
                        </div>
                        <div className={styles.mobile}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Phone</span>
                                <input
                                    type="text"
                                    name='phone'
                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Cell Phone</span>
                                <input
                                    type="text"
                                    name='cellphone'
                                />
                            </div>
                        </div>

                        <div className={styles.mobile}>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Primary Email<span className={styles.asterisk}>*</span></span>
                                <input
                                    type="text"
                                    name='phone'
                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>Label</span>
                                <input
                                    type="text"
                                    name='cellphone'
                                />
                            </div>
                            <div className={styles.wrap}>
                                <span className={styles.label}>delete</span>
                                <img src={bin} alt="avatar" className={styles.img2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.footer}>
                <button>Save</button>
                <button>Save & Close</button>
            </div>

        </div>
    )
}

export default CustomerContact