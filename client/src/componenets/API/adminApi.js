import axios from 'axios'

import admininstance from '../instance/axiosInstanceAdmin'


export const addTask = (details)=> admininstance.post('/add-task' , details)
export const viewUsers = ()=> admininstance.get('/view-user')
export const weeklyReports=()=> admininstance.get('/weekly-report')


