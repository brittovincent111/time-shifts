import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSideBar from '../../componenets/admin/AdminSidebar'
// import Header from '../../components/admin/Header'

function Structure() {

  const Navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      Navigate('/admin/dashboard')


    }else {

      Navigate('/admin/login')
    }
},[])


  return (
    <div>
      <div className='flex'>
        <AdminSideBar />
        <div className='w-full '>
          {/* <Header /> */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Structure