import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clientProfile } from '../store/actions/priceFactor';
import  Router  from 'next/router';


const Companies = () => {

  const dispatch = useDispatch();
  const plansSlot = useSelector(state => state.priceFactor.client.data)

  useEffect(() => {
    dispatch(clientProfile())

  }, []);

  return (
    <div>
      <h1 className='heading'>Companies</h1>
      <div className='listcompanies'>
        {
          plansSlot.map((item) => {
            const companyName = item?.fields?.retailerName
            const regex = /\s+(\w)?/gi;
            const output = companyName?.toLowerCase().replace(regex, function (match, letter) {
              return letter?.toUpperCase();
            });
            return (
              <li className='btn1' onClick={() => {
                localStorage.setItem('companyName', output);
                Router.push(`/${output}`)
              }}>
                {item.fields.retailerName}
              </li>
            )
          })
        }
      </div>
    </div>
  )
}

export default Companies