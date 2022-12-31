import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../componenets/user/navbar/Navbar'

function UserStructure() {

  const Navigate = useNavigate()

  useEffect(()=>{
      if(localStorage.getItem('userToken')){
        Navigate('/dashboard')


      }else {

        Navigate('/login')
      }
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default UserStructure