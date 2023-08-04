import { urlObjects } from "../UTILS/urlObjects"

let userCompany
if (typeof window !== 'undefined') {
    userCompany = localStorage.getItem('companyName')
}


const dynamicUrl= urlObjects[userCompany]
console.log("dynamic",dynamicUrl)


export const saveOrderData=async (data)=>{
    let url = `https://api.airtable.com/v0/${dynamicUrl?.key}/Orders`;

    console.log("url",url)
   
    const res =  await fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer key0AV84zSplHpV5B",
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify(data)
    });
    const responseData=await res.json()
    return responseData
     
  }
