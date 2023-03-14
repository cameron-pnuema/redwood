import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';


export default function Home() {

  const select = useSelector((state)=>state)

  console.log('select',select)
  useEffect(() => {   
    return ()=>{
      sessionStorage.clear()
    }
  }, []);
  return (
    <div>
      <HomeTemplate />
    </div>
  )
}
