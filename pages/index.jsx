import React,{useEffect} from 'react';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';


export default function Home() {
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
