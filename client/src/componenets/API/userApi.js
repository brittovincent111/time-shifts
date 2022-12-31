import axios from 'axios'
import userinstance from '../instance/axiosInstanceUser'

/* ----- const API = axios.create({ baseURL :'http://localhost:4000/'}) ----- */


export const getTasks = (userId, assigned)=> userinstance.get(`/get-tasks/${userId}/${assigned}`)
export const updateTask = (details ) => userinstance.put(`/update-task` , details)

