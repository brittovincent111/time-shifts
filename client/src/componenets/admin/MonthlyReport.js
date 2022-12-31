import React, { useEffect, useState } from 'react'
import { weeklyReports } from '../API/adminApi'
const format = require('format-duration')


function MonthlyReport() {

    const [reports, setReports] = useState([])


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

    console.log(reports, "reports")
    return (
        <>
            <div className='m-10'>
                <div className='w-full h-10 flex justify-center text-lg font-bold'> MonthlyReport</div>
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
                                    Total Task
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

                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {obj._id}
                                        </th>
                                        <td class="py-4 px-6">
                                            {obj.total} hr
                                        </td>
                                        <td class="py-4 px-6">
                                            {hours} hr {remaining_minutes} min
                                        </td>
                                        <td class="py-4 px-6">
                                            {(obj.count)}
                                        </td>

                                        <td class="py-4 px-6 text-right">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )

                            })}


                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default MonthlyReport