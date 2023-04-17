import React from 'react'
import styles from './LeadOpportunitesTemplate.module.scss';
import filter from "../../assets/img/Feather-core-filter.svg";
import mail from "../../assets/img/email-mail-web-svgrepo-com.svg";
import { Checkbox } from 'react-input-checkbox';
import add from "../../assets/img/icons8-add-67.png";

const LeadOpportunitesTemplate = () => {


   const tabs = [
        {
            id: 1,
            label: "List View",
        },
        {
            id: 2,
            label: "Activity View",
        },
        {
            id: 3,
            label: "Activity Calendar",
        },
        {
            id: 4,
            label: "Activity Tempelate",
        },
        {
            id: 5,
            label: "Lead Proposals",
        },
        {
            id: 6,
            label: " Proposals  Tempelate",
        },
        {
            id: 7,
            label: "Map",
        },
    ];
    const mockData = [
        {
            id: 1,
            title: "Opportunity Title 1",
            createdDate: "Jun 10, 2015",
            customerContact: "Aaron Diana Acres",
            status: "open",
            age: "1005 days",
            confidence: "0%",
            estimatedRevenue: "$0.00",
        },
        {
            id: 2,
            title: "Opportunity Title 2",
            createdDate: "Jan 15, 2016",
            customerContact: "Bobby Brown",
            status: "closed",
            age: "800 days",
            confidence: "80%",
            estimatedRevenue: "$10,000.00",
        },
        {
            id: 3,
            title: "Opportunity Title 3",
            createdDate: "Mar 22, 2017",
            customerContact: "Cathy Carlson",
            status: "open",
            age: "400 days",
            confidence: "50%",
            estimatedRevenue: "$5,000.00",
        },
        {
            id: 4,
            title: "Opportunity Title 4",
            createdDate: "Apr 01, 2018",
            customerContact: "David Davis",
            status: "closed",
            age: "100 days",
            confidence: "90%",
            estimatedRevenue: "$12,000.00",
        },
        {
            id: 5,
            title: "Opportunity Title 5",
            createdDate: "Nov 12, 2018",
            customerContact: "Emily Evans",
            status: "open",
            age: "154 days",
            confidence: "70%",
            estimatedRevenue: "$7,500.00",
        },
        {
            id: 6,
            title: "Opportunity Title 6",
            createdDate: "Jan 02, 2019",
            customerContact: "Frank Franklin",
            status: "open",
            age: "94 days",
            confidence: "30%",
            estimatedRevenue: "$2,500.00",
        },
        {
            id: 7,
            title: "Opportunity Title 7",
            createdDate: "May 07, 2019",
            customerContact: "George Gray",
            status: "closed",
            age: "12 days",
            confidence: "95%",
            estimatedRevenue: "$15,000.00",
        },
        {
            id: 8,
            title: "Opportunity Title 8",
            createdDate: "Sep 18, 2020",
            customerContact: "Hannah Hernandez",
            status: "open",
            age: "210 days",
            confidence: "60%",
            estimatedRevenue: "$6,000.00",
        },
        {
            id: 9,
            title: "Opportunity Title 9",
            createdDate: "Feb 28, 2021",
            customerContact: "Isaac Ivanov",
            status: "open",
            age: "47 days",
            confidence: "40%",
            estimatedRevenue: "$4,000.00",
        },
        {
            id: 10,
            title: "Opportunity Title 10",
            createdDate: "Nov 30, 2021",
            customerContact: "Jessica James",
            status: "open",
            age: "136 days",
            confidence: "20%",
            estimatedRevenue: "$1,000.00",
        },
        {
            id: 11,
            title: "Opportunity Title 8",
            createdDate: "Sep 18, 2020",
            customerContact: "Hannah Hernandez",
            status: "open",
            age: "210 days",
            confidence: "60%",
            estimatedRevenue: "$6,000.00",
        },
        {
            id: 12,
            title: "Opportunity Title 9",
            createdDate: "Feb 28, 2021",
            customerContact: "Isaac Ivanov",
            status: "open",
            age: "47 days",
            confidence: "40%",
            estimatedRevenue: "$4,000.00",
        },
        {
            id: 13,
            title: "Opportunity Title 10",
            createdDate: "Nov 30, 2021",
            customerContact: "Jessica James",
            status: "open",
            age: "136 days",
            confidence: "20%",
            estimatedRevenue: "$1,000.00",
        },
    ];

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h3>Lead Opportunities</h3>
            </div>
            <div className={styles.wrapper}>
                {tabs.map((button) => (
                    <button key={button.id}>{button.label}</button>
                ))}


            </div>
            <div className={styles.options}>
                <button>Export</button>
                <button>Import Lead Opportunities</button>
                <button>  <img src={filter} alt="filter" />  Filter (1) </button>
                <button>New Lead Opportunities</button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th><Checkbox></Checkbox></th>
                            <th>Opportunity Title</th>
                            <th>Created Date</th>
                            <th>Customer Contact</th>
                            <th>Status</th>
                            <th>Age</th>
                            <th>Confidence</th>
                            <th>Estimated Revenue (Min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((row) => (
                            <tr key={row.id}>
                                <td><Checkbox></Checkbox></td>
                                <td><span className={styles.mark}>NEW  </span><img src={add} alt="add" /> <img src={mail} alt="mail" />{row.customerContact}</td>
                                <td>{row.createdDate}</td>
                                <td>{row.customerContact}</td>
                                <td><span className={styles.mark2}>{row.status}</span></td>
                                <td>{row.age}</td>
                                <td><span>{row.confidence}</span></td>
                                <td>{row.estimatedRevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer>

                <div className={styles.dropdown}>
                    <select id="menu" name="menu">
                        <option value="option1" selected>Standard View</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                
                <div className={styles.pagination}>
                    <p>1-50 items of 920 items</p>
                    <div class="pages">
                    <a href="#" class="previous">&laquo;</a>
                    <span class="current-page">1</span> / <span class="total-pages">5</span>
                    <a href="#" class="next">&raquo;</a>
                </div>
                    <select id="menu" name="menu">
                        <option value="option1" selected>50/page</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
            </footer>

        </div>
    )
}

export default LeadOpportunitesTemplate