import React from 'react'
import axios from 'axios'
import {useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddUser() {
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()


    let onSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!username) {
                setErrorMessage("Username is required");
            } else if (username.length < 4) {
                setErrorMessage("Username must be atleast 4 characters");
            }
            else if (!email) {
               setErrorMessage("Email is required");
           } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
               setErrorMessage("Enter a valid email");
           } else if (!password) {
               setErrorMessage("Password is required");
           } else if (password.length < 4) {
               setErrorMessage("Password must be atleast 4 characters");
           } else if (password.length > 20) {
               setErrorMessage("Password must be less than 20 characters");
           } else {
            await axios.
            post('http://localhost:4000/admin/create-user',
             {
                email: email,
                password: password,
                username: username
            }).
            then((response) => {

                const notify = () => toast("User Created");
                notify()

             
           }).catch((data) => {
             setErrorMessage(data.response.data.error);
            
           })
           }
       } catch (error) {
           console.log(error.message);
       }
   }
    return (
        <>
        <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
        <form >

            <div className=" min-h-screen flex flex-col bg-gray-100 ">

       
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-gray-100">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl font-medium text-black text-center">Create User</h1>
                {errorMessage && <div className="p-4 mb-4 text-sm text-center text-red-700 bg-red-50 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                       
                       <p>{errorMessage.email}</p>
                       <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="username"
                            
                            onChange={(e)=> {setUsername(e.target.value)}}
                            
                            placeholder="User Name" />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            
                            onChange={(e)=> {setEmail(e.target.value)}}
                            
                            placeholder="Email" />
                        

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                        
                            onChange={(e)=> {setPassword(e.target.value)}}
                            placeholder="Password" />
                        

                        <button
                            type="submit"
                            onClick={(e) => onSubmit(e)} 
                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                        >ADD</button>

                       
                    </div>

                </div>
            </div>
        </form>
        </>
    )
}

export default AddUser