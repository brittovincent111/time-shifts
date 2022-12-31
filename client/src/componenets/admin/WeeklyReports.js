import React, { useEffect, useState } from 'react'
import { weeklyReports } from '../API/adminApi'
import Table from './Table'
const format = require('format-duration')


function WeeklyReports() {

    const [reports, setReports] = useState([])

    /* ----------------------------- WEEKLY REPORTS ----------------------------- */
    useEffect(() => {
        try {
            const call = async () => {
                const { data } = await weeklyReports()
                setReports(data.weeklyData)
            }

            call()

        } catch (error) {

            console.log(error, "error")

        }


    }, [])

    return (
        <>
            <div className='m-10'>
                <div className='w-full h-10 flex justify-center text-lg font-bold'>Weekly Report</div>
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Date
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Estimated Time
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Time Taken
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    status
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Total Task
                                </th>


                            </tr>
                        </thead>
                        <tbody>

                            {reports?.map((obj) => {

                                let minutes = obj.totalTime
                                let hours = Math.floor(minutes / 60)
                                let remaining_minutes = minutes % 60



                                return (

                                    <Table obj={obj} hours={hours} remaining_minutes={remaining_minutes} />
                                )

                            })}


                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default WeeklyReports