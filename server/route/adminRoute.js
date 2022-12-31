let  express = require('express');
const { AdminLogin, createUsers,weeklyReports, viewUsers, taskForm } = require('../controller/adminController');
const adminVerifyJWT = require('../verify/adminVerify');
const router = express.Router()

router.post('/login' , AdminLogin)
router.post('/create-user' ,createUsers)
router.get('/view-user' , adminVerifyJWT ,viewUsers)
router.post ('/add-task' ,adminVerifyJWT, taskForm )
router.get('/weekly-report' , adminVerifyJWT , weeklyReports)













module.exports = router