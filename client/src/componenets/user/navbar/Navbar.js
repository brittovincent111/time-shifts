import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import { getTasks } from '../../API/adminApi'
import jwt_decode from "jwt-decode";
import { Link , NavLink, useNavigate } from 'react-router-dom';
import './navbar.css'
import Swal from 'sweetalert2';
import moonhive from '../../../images/MOONHIVE2.jpg'





function Navbar() {

    const Navigate = useNavigate()

    /* ------------------------------- LOGOUT USER ------------------------------ */

    const handleLogout =async(e)=>{

        e.preventDefault()
        try {
            Swal.fire({
              title: 'Are you sure?',
              text: "Do you want to logout!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, continue!'
            }).then((result) => {
              if (result.isConfirmed) {
               
      
      
                localStorage.removeItem('userToken')
                localStorage.removeItem('user')
                Navigate('/login')
              }
            })
      
      
          } catch (error) {
      
            console.log(error)
          }

             
    }


    return (
        <>
            <nav className="bg-white px-2 fixed sm:px-4 py-2.5 dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="https://flowbite.com/" className="flex items-center ">
                        <img src={moonhive} className="h-16 mr-3" alt="Flowbite Logo" />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MOONHIVE</span> */}
                    </a>
                    <div className="flex md:order-2" onClick={handleLogout}>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LogOut</button>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <NavLink to='/dashboard'>
                                <a className="block text-inherit py-2 pl-3 pr-4  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" id='home' >Home</a>
                            </NavLink>
                            <NavLink to='/assigned'>
                                <a className="block text-inherit py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" id="asssigned" >Assigned</a>
                            </NavLink>
                            <NavLink to='/started'>
                                <a className="block text-inherit py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" id='started' >Started</a>
                            </NavLink>
                            <NavLink to='/completed'>
                                <a className="block text-inherit py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" id='completed' >Completed</a>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
            
          
        </>

    )
}

export default Navbar