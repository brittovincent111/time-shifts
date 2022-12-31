import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { viewUsers } from '../API/adminApi'

function ViewUser() {

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [count , setCount] = useState('')

    const Navigate =useNavigate()
    


    /* ------------------------------- LIST USERS ------------------------------- */

    useEffect(() => {

        try {

            const call = async () => {

                const { data } = await viewUsers(currentPage)
                setUsers(data.users)
                setCount(data.count)

            }

            call()

        } catch (error) {
            
            if (error?.response?.status === 403) {
                console.log("hiiii")
                localStorage.removeItem('Admintoken')
               
                Navigate("/admin/login")
             }else{
               Navigate('/admin/errorPage')
             }
        }
    },[currentPage])

    const nextPage=(e)=>{
        e.preventDefault()

        setCurrentPage(currentPage +1)
    }

    const previousPage=(e)=>{
        e.preventDefault()

        setCurrentPage(currentPage -1)
    }
   
    const next = ((currentPage+1 )* 5 ) -4 

    console.log(currentPage,"fff")

    console.log(count , next ,"klkkl")

    
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
        
            <div className='flex justify-between mt-5 w-max'>
                { currentPage == 1? 
              <div className='w-max h-max p-1 ml-2 shadow-md bg-gray-200' >Previous</div> :
                <div className='w-max h-max p-1 ml-2 shadow-md cursor-pointer' onClick={previousPage}>Previous</div>
                }
                <div className='p-1 ml-2'>{currentPage}</div>
                {
                    next < count ?

                    <div className='w-max h-max p-1 ml-2 shadow-md cursor-pointer' onClick={nextPage}>Next</div>:
                    <div className='w-max h-max p-1 ml-2 shadow-md bg-gray-200' >Next</div>
                }
                  
            </div>
            </div>

        </>
    )
}

export default ViewUser