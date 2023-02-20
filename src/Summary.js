import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Summary.css'
import Display from './Display';
// import {FaAngleRight, FaAngleLeft,FaSearch} from "react-icons/fa";
function Summary() {
   // http://localhost:5000/device
   const [arr, setArr] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:4000/device")
         .then(response => {
            setArr(response.data);

         })
         .catch(error => {
            return error;
         });

   }, []);




   return (
      <div className='summary'>

         <div>
            {
               arr.length > 0 ? <Display arr={arr} /> : null
            }
         </div>


      </div>
   )
}

export default Summary
