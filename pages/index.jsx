import React, { useEffect, useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';
import LoginTemplate from '../templates/LoginTemplate/LoginTemplate';
import { useDispatch, useSelector } from 'react-redux';
import {  clientProfile } from '../store/actions/priceFactor';
import { formValidator } from '../UTILS/validator';
import Router from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerContact from '../templates/CustomerContactTemplate/CustomerContact';


export default function Home() {

  const [isUser, setIsUser] = useState('')

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(clientProfile())

    return () => {
      sessionStorage.clear()
    }
  }, []);



  const [userDetails, setDetails] = useState({
    username: "",
    password: "",
    errors: {}
  })

  const handleChange = (value, name) => {
    const data = { ...userDetails };
    data[name] = value;
    setDetails({ ...data });
  };

  const plansSlot = useSelector(state => state.priceFactor.client.data)
  const userValidation = plansSlot.find(item => item.fields.username === userDetails.username && item.fields.password === userDetails.password)
  const adminValidation = plansSlot.find(item => "admin@redrootscapital.com" === userDetails.username && "RRTTTM2023!"=== userDetails.password)
  const userCompany = userValidation?.fields?.retailerName || adminValidation?.fields?.retailerName
  const regex = /\s+(\w)?/gi;
  const output = userCompany?.replace(/\s+/g, '').toLowerCase();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = formValidator(userDetails);
    setDetails({ ...userDetails, errors })
    userValidation ? toast.success('Login successful!', {
      position: toast.POSITION.TOP_CENTER
    }) : toast.error('Invalid email or password.', {
      position: toast.POSITION.TOP_CENTER
    });
    userValidation && (localStorage.setItem('username', userDetails.username))
    userValidation && localStorage.setItem('companyName', output)
      userValidation && !adminValidation &&
      setTimeout(() => {
        Router.push(`/${output}`)
      })
      userValidation && adminValidation &&
      setTimeout(() => {
        Router.push(`/companies`)
      })

  };

  useEffect(() => {
    const user = localStorage.getItem('username')
    setIsUser(user)
  }, [])


  const UserRedirect = ({ isUser }) => {
    if (isUser) {
      return <HomeTemplate />
    } else {
      return <LoginTemplate
        userDetails={userDetails}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userValidation={userValidation}
        setDetails={setDetails}
      />
    }
  }

  return (
    <div>
      {/* <UserRedirect isUser={isUser} /> */

        isUser ? <HomeTemplate /> : <LoginTemplate
          userDetails={userDetails}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          userValidation={userValidation}
          setDetails={setDetails}
        />}

    </div>
  )
}
