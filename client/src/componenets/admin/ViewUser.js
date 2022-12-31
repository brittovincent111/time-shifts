import React, { useEffect, useState } from 'react'
import { viewUsers } from '../API/adminApi'

function ViewUser() {

    const [users, setUsers] = useState([])

    /* ------------------------------- LIST USERS ------------------------------- */

    useEffect(() => {

        try {

            const call = async () => {

                const { data } = await viewUsers()

                

                setUsers(data.users)

            }

            call()

        } catch (error) {

        }
    },[])

    
    return (
        <>
            <div className='m-10'>
                <div className='w-full h-10 flex justify-center text-lg font-bold'>User Managment</div>
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    UserName
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    email
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Password
                                </th>

                                {/* <th scope="col" class="py-3 px-6">
                                    <span class="sr-only">Block</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {users?.map((obj) => {

                                return(

                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                       {obj.username}
                                    </th>
                                    <td class="py-4 px-6">
                                    {obj.email}
                                    </td>
                                    <td class="py-4 px-6">
                                        {obj.password}
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

export default ViewUser