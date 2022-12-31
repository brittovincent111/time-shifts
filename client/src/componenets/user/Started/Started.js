import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import jwt_decode from "jwt-decode";
import { getTasks } from '../../API/userApi';
import Countdown from 'react-countdown';
import { MdOutlineFeed } from 'react-icons/md'


// Random component

export default function Started() {

    // const Completionist = () => <span>You are good to go!</span>;


    const [taskStarted, setTaskStarted] = useState([])
    const [updation, setUpdation] = useState()


    let token = localStorage.getItem('userToken');
    let decoded = jwt_decode(token);
    
    /* ------------------------------ TASK STARTED ------------------------------ */
    useEffect(() => {

        try {
            const call = async () => {

                const { data } = await getTasks(decoded.id, "started")

                setTaskStarted(data.taskView)

            }
            call()

        } catch (error) {

        }

    }, [updation])

    return (
        <div className='  h-screen w-screen     backgrounddashboard'>
            <div className=' font-semibold text-4xl w-full flex justify-center pt-28 text-white'>Tasks Started </div>

            {!taskStarted.length == 0 ?
                <Card props={taskStarted} setUpdation={setUpdation} updation={updation} />
                : <div className='flex flex-col w-full items-center pt-20 text-white h-screen  '>
                    <MdOutlineFeed className='text-[150px]' />
                    <div className='text-2xl'>No Pending Tasks</div>

                </div>

            }
        </div>
    )
}

