import React, { useEffect, useState } from 'react'
import { addTask, viewUsers } from '../API/adminApi'

function AdminAddTask() {

    const [users, setUsers] = useState([])
    const [details, setDetails] = useState({
        taskname: '',
        assigned: "",
        description: "",
        time: ""
    })

    /* -------------------------- GET VALUES FROM FORM -------------------------- */

    const onHandleChange = ((e) => {

        e.preventDefault()

        setDetails({ ...details, [e.target.name]: e.target.value })
        console.log(details)

    })

    /* ------------------------------- VIEW USERS ------------------------------- */

    useEffect(() => {

        try {

            const call = async () => {

                const { data } = await viewUsers()

                console.log(data.users)
                setUsers(data.users)

            }
            call()

        } catch (error) {

            console.log(error)
        }

    }, [])


    /* ---------------------------- ADD TASK BY ADMIN --------------------------- */

    const onLogin = async (e) => {
        e.preventDefault()


        try {
            console.log(details)
            const { data } = await addTask(details)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className=' h-screen flex justify-center items-center'>

            <form class="w-full max-w-lg" onSubmit={onLogin}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Task Name
                        </label>
                        <input name='taskname' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
                        type="text" placeholder="Task"
                         onChange={(e) => { onHandleChange(e) }} 
                         required/>
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Estimated Time
                        </label>
                        <input name='time' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                         type="text" placeholder="Estimated Time"
                          onChange={(e) => { onHandleChange(e) }} 
                          required/>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Employee
                        </label>
                        <div class="relative">
                            <select name='assigned' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                             id="grid-state"
                              onChange={(e) => { onHandleChange(e) }} >
                                {
                                    users?.map((obj) => {
                                        return (
                                            <option value={obj._id}>{obj.username}</option>
                                        )
                                    })
                                }


                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Description
                        </label>
                        <textarea name='description' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" 
                        placeholder="Description"
                         onChange={(e) => { onHandleChange(e) }}
                         required />
                        <p class="text-gray-600 text-xs italic">Please add complete details of project</p>
                    </div>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AdminAddTask