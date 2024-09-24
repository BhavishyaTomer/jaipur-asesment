import React, { useState,useEffect } from 'react';
import axios from 'axios'
import storedData from './Data.json'

const App = () => {
  const[data,fetchedData]=useState([])
  useEffect(()=>{
//  const fetchData=async ()=>{
// try {
//   const data=await axios.get('./Data.json');
//   console.log(data)
// } catch (error) {
//   console.log("error is",error)
// }
//  }
//  fetchData();
 console.log(storedData.data.data[0])
fetchedData(Object.values(storedData.data.data))
  },[])
  return (
    <div>App
   {
    data.map((info,index)=>{
      return(
        <>
        <div key={index}>
        <span> name is 
        {
          info.event.name
        }
        </span>
        <span> name is 
        {
          info.players[0].name
        }
        </span>
        <span> yards name
          {
            ` ${info.bidStats.name}  =  ${info.bidStats.value}`
          }
        </span>
        </div>
        </>
      )
    })
   }


    </div>
  )
}

export default App