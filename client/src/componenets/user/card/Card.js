import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { updateTask } from '../../API/userApi';
import Countdown from 'react-countdown'
import Swal from 'sweetalert2';
// window.Swal = swal;
const format = require('format-duration')

function Card({ props, setUpdation, updation }) {

   /* ------------------------------ ID FROM TOKEN ----------------------------- */

  let token = localStorage.getItem('userToken');
  let decoded = jwt_decode(token);


/* ------------------------------ COMMON CARDS ------------------------------ */

  const handleClick = async (e, taskId, status) => {
    e.preventDefault()

    const details = {

      userId: decoded.id,
      status: status,
      taskId: taskId
    }

    console.log(details, "detailsss")

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to continue!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, continue!'
      }).then(async(result) => {
        if (result.isConfirmed) {
         
          const { data } = await updateTask(details)
          setUpdation(!updation)


          Swal.fire(
            'Submited!',
          
            'success'
          )
        }
      })


    } catch (error) {

      console.log(error)
    }

  }



  return (
    <>
      <div className='grid p-16 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 '>
        {/* <div>{}</div> */}
        {
          props?.map((obj) => {
            let date = format((new Date(obj.completed).getTime() - new Date(obj.started).getTime()) / 60)
            return (
              // <div className='flex items-center w-screen h-screen'>


              <div>


                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{obj.taskname}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{obj.description}</p>

                    <div className='flex gap-2'>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 ">Estimated Time</p>

                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{obj.time} hr</p>
                    </div>


                    {obj.status == 'assigned' ?
                      <button onClick={(e) => { handleClick(e, obj._id, 'started') }} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Start             <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button> : null

                    }
                    {obj.status == 'started' ?
                      <div className='flex-col flex'>
                        <Countdown date={new Date(obj.started).getTime() + obj.time * 3600000} />
                        <button onClick={(e) => { handleClick(e, obj._id, 'completed') }} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-20">
                          Finish      <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                      </div> : null


                    }
                    {
                      obj.status == 'completed' ?
                        <div className='flex gap-2'>
                          <div>Completed Time</div>
                          <div>{date} hr</div>
                        </div> :
                        null
                    }


                  </div>
                </div>
              </div>


              // </div>
            )
          })
        }
      </div>

    </>
  )
}

export default Card