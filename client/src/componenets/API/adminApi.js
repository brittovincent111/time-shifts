import axios from 'axios'

import admininstance from '../instance/axiosInstanceAdmin'


export const addTask = (details)=> admininstance.post('/add-task' , details)
export const addUser = (details) => admininstance.post('/create-user' , details)
export const viewUsers = (currentPage)=> admininstance.get(`/view-user/${currentPage}`)
export const weeklyReports=()=> admininstance.get('/weekly-report')
export const monthlyReports=()=> admininstance.get('/monthly-report')
export const graphPost =()=> admininstance.get('/task-graph')
export const userDetails =()=> admininstance.get('/admin-dashboard')
export const completedWorksGraph=()=> admininstance.get('/work-graph')

