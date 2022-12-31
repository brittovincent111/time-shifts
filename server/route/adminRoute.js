let  express = require('express');
const { AdminLogin, createUsers,workCompletedGraph,dashboardDetails,weeklyReports, viewUsers,taskGraph, taskForm, monthlyReport } = require('../controller/adminController');
const adminVerifyJWT = require('../verify/adminVerify');
const router = express.Router()

router.post('/login' , AdminLogin)
router.post('/create-user' , adminVerifyJWT,createUsers)
router.get('/view-user/:page' , adminVerifyJWT ,viewUsers)
router.post ('/add-task' ,adminVerifyJWT, taskForm )
router.get('/weekly-report' , adminVerifyJWT , weeklyReports)
router.get('/monthly-report' , adminVerifyJWT , monthlyReport)
router.get('/task-graph' ,adminVerifyJWT , taskGraph)
router.get('/work-graph' ,adminVerifyJWT , workCompletedGraph)

router.get('/admin-dashboard' ,adminVerifyJWT , dashboardDetails)














module.exports = router