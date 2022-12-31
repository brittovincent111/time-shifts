


import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import jwt_decode from "jwt-decode";
import { getTasks } from '../../API/userApi';
import { MdOutlineFeed } from 'react-icons/md'


export default function Completed() {


    const [taskAssigned, setTaskAssigned] = useState([])
    const [updation, setUpdation] = useState()

    /* ------------------------------ ID FROM TOKEN ----------------------------- */
    let token = localStorage.getItem('userToken');
    let decoded = jwt_decode(token);

    /* ----------------------------- COMPLETED TASKS ---------------------------- */

    useEffect(() => {

        try {
            const call = async () => {

                const { data } = await getTasks(decoded.id, "completed")

                setTaskAssigned(data.taskView)

            }
            call()

        } catch (error) {

        }

    }, [])


    return (


        <div className=' bg-blue-200 h-screen w-screen backgrounddashboard'>
            <div className='font-semibold text-4xl w-full flex justify-center pt-28 text-white'>Tasks Completed </div>
            {!taskAssigned.length == 0 ?
                <Card props={taskAssigned} setUpdation={setUpdation} updation={updation} />
                : <div className='flex flex-col w-full items-center pt-20 text-white h-screen  '>
                    <MdOutlineFeed className='text-[150px]' />
                    <div className='text-2xl'>No Pending Tasks</div>

                </div>
            }

        </div >
    )
}

