export const saveOrderData=async (data)=>{
    let url = `https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Orders`;
   
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
