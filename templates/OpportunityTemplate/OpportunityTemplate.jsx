import React from 'react'
import styles from './OpportunityTemplate.module.scss';

const OpportunityTemplate = () => {
    const tabs = [
        {
            id: 1,
            label: "General",
        },
        {
            id: 2,
            label: "Activities",
        },
        {
            id: 3,
            label: "Proposals",
        },
    ]

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h3>Lead Opportunity</h3>
            </div>
            <div className={styles.wrapper}>
                {tabs.map((button) => (
                    <button key={button.id}>{button.label}</button>
                ))}
            </div>
            <div className={styles.container}>
                <div className={styles.input}>
                    <div className={styles.name}>
                        <div className={styles.wrap}>
                            <span className={styles.label}>Opportunity Title<span className={styles.asterisk}>*</span></span>
                            <input
                                type="text"
                                name='FirstName'

                            />
                            <span className={styles.blue}>Copy from contact</span>
                        </div>
                    </div>
                    <h4>Address</h4>
                    <div className={styles.address}>
                        <div className={styles.wrap}>
                            <span className={styles.label}> Street Address</span>
                            <input
                                type="text"
                                name='Address'
                            />
                        </div>
                    </div>
                    <div className={styles.location}>
                        <div className={styles.wrap} style={{width:"50%"}}>
                            <span className={styles.label}>City</span>
                            <input
                                type="text"
                                name='city'
                            />
                        </div>
                        <div className={styles.wrap} style={{width:"25%"}}>
                            <span className={styles.label }>State</span>
                            <input
                                type="text"
                                name='state'
                            />
                        </div>
                        <div className={styles.wrap} style={{width:"25%"}}>
                            <span className={styles.label}>Zip Code</span>
                            <input
                                type="text"
                                name='zipCode'
                            />
                        </div>
                    </div>
                    <div className={styles.last}>
                        <div className={styles.wrap} style={{ width: "30%", marginRight: "20px" }}>
                            <span className={styles.label}>Confidence</span>
                            <input type="range" min="0" max="100" />
                        </div>
                        <div className={styles.wrap} style={{ width: "10%" }}>
                            <span className={styles.label}>Projected Sales date</span>
                            <input type="date" placeholder="Select a date"
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.salespeople}>
                <div className={styles.wrap}>
                        <span className={styles.label}>Sales People</span>
                        <input
                                type="text"
                                name='zipCode'
                            />
                        </div>
                </div>
                <div className={styles.tags}>
                    <div className={styles.wrap}>
                        <span className={styles.label}>Tags</span>
                        <div className={styles.spread}>
                            <input
                                type="text"
                                name='zipCode'
                            />
                            <span className={styles.blue}>Add</span>
                            <span className={styles.blue}style={{ color:"gray"}}>Edit</span>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <span className={styles.label}>Sources</span>
                        <div className={styles.spread}>
                            <input
                                type="text"
                                name='zipCode'
                            />
                            <span className={styles.blue}>Add</span>
                            <span className={styles.blue} style={{ color:"gray"}}>Edit</span>
                        </div>
                    </div>
                    <div className={styles.wrap}>
                        <span className={styles.label}>Project Type</span>
                        <div className={styles.spread}>
                            <input
                                type="text"
                                name='zipCode'
                            />
                            <span className={styles.blue}>Add</span>
                            <span className={styles.blue} style={{ color:"gray"}}>Edit</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <button>Save & New</button>
                <button>Save</button>
                <button>Save & Close</button>
            </div>
        </div>
    )
}

export default OpportunityTemplate