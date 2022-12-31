let  express = require('express');
const { AdminLogin, createUsers,workCompletedGraph,dashboardDetails,weeklyReports, viewUsers,taskGraph, taskForm, monthlyReport } = require('../controller/adminController');
const adminVerifyJWT = require('../verify/adminVerify');
const router = express.Router()

router.post('/login' , AdminLogin)
router.post('/create-user' ,createUsers)
router.get('/view-user' , adminVerifyJWT ,viewUsers)
router.post ('/add-task' ,adminVerifyJWT, taskForm )
router.get('/weekly-report' , adminVerifyJWT , weeklyReports)
router.get('/monthly-report' , adminVerifyJWT , monthlyReport)
router.get('/task-graph' , taskGraph)
router.get('/work-graph' , workCompletedGraph)

router.get('/admin-dashboard' , dashboardDetails)














module.exports = router