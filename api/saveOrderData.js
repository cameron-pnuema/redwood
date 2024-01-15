import { urlObjects } from "../UTILS/urlObjects"
import { personalAT } from "../UTILS/api"



export const saveOrderData = async (data) => {

  let userCompany
  if (typeof window !== 'undefined') {
    userCompany = localStorage.getItem('companyName')
  }


  const dynamicUrl = urlObjects[userCompany]
  let url = `https://api.airtable.com/v0/${dynamicUrl?.key}/Orders`;



  const res = await fetch(url, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${personalAT}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  });
  const responseData = await res.json()
  return responseData

}
