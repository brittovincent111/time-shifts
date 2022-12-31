import React, { useContext, useEffect, useState } from 'react'
import { getTasks } from '../../API/adminApi'
import jwt_decode from "jwt-decode";
import Card from '../card/Card';
import { NavLink } from 'react-router-dom';
import './userdashboard.css'


function UserDashboard() {




  return (
    <>
   
    
  <div className='w-screen h-screen  backgrounddashboard' >

    <div className='flex-col flex justify-center items-center w-full h-full'>
      <div className='text-4xl font-bold text-white pb-5 shadow-sm'>Welcome to the works</div> 
      <div className='text-xl font-bold text-white'>Please Check Your Assigned Tasks</div>

    </div>
       
  </div>
    </>

  )
}

export default UserDashboard