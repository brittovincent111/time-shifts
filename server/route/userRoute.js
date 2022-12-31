let  express = require('express');
const { userLogin, updateTask, getTasks } = require('../controller/userController');
const verifyJwtUser = require('../verify/userVerify');
const router = express.Router()

router.post('/login', userLogin )
router.get('/get-tasks/:id/:type' ,verifyJwtUser , getTasks)

router.put('/update-task' ,verifyJwtUser, updateTask)























module.exports = router