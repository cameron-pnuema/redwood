import React, { useEffect, useState } from 'react';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';
import LoginTemplate from '../templates/LoginTemplate/LoginTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getMarkup, clientProfile } from '../store/actions/priceFactor';
import { formValidator } from '../UTILS/validator';
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Company from './[company]';


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
    email: "",
    password: "",
    errors: {}
  })

  const handleChange = (value, name) => {
    const data = { ...userDetails };
    data[name] = value;
    setDetails(data);
  };

  const plansSlot = useSelector(state => state.priceFactor.client.data)
  const userValidation = plansSlot.find(item => item.fields.pointOfContactEmail === userDetails.email && item.fields.password === userDetails.password)
  const userCompany = userValidation?.fields?.retailerName
  const regex = /\s+(\w)?/gi;
  const output = userCompany?.toLowerCase().replace(regex, function (match, letter) {
    return letter?.toUpperCase();
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = formValidator(userDetails);
    setDetails({ ...userDetails, errors })
    userValidation ? toast.success('Login successful!', {
      position: toast.POSITION.TOP_CENTER
    }) : toast.error('Invalid email or password.', {
      position: toast.POSITION.TOP_CENTER
    });

    userValidation &&
      setTimeout(() => {
        Router.push('/companies')
      }, 5000)
    userValidation && (localStorage.setItem('username', userDetails.email))
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
      />
    }
  }

  return (
    <div>
      <UserRedirect isUser={isUser} />

    </div>
  )
}
