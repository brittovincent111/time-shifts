const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const taskSchemaa = require('../schema/taskSchema')
const userSchemma = require('../schema/userSchema')

const controller = {


    AdminLogin: async (req, res) => {

        const { email, password } = req.body

        try {

            if (process.env.ADMIN_EMAIL == email) {
                if (process.env.ADMIN_PASS == password) {
                    const id = process.env.ADMIN_ID
                    const token = jwt.sign({ id }, process.env.JWT_KEY_ADMIN, {
                        expiresIn: "365d",
                    })

                    console.log(token, "tokenn")
                    res.json({ token: token, auth: true })

                } else {

                    res.status(401).json({ error: "Wrong password" })

                }

            } else {

                res.status(401).json({ error: "Email Wrong" })

            }

        } catch (e) {
            res.status(500).json({ error: "server error" })
            console.log(e)

        }
    },


    /* -------------------------- create user by admin -------------------------- */

    createUsers: async (req, res) => {

        try {
            console.log(req.body, "body ")
            let {
                email,
                username,
                password
            } = req.body

            password = await bcrypt.
                hash(req.body.password, 10)

            let emailCheck = await userSchemma.
                findOne({ email: email })
            if (emailCheck) {

                res.status(401).
                    json({ error: "Email Exists" })
            } else {

                await userSchemma.create({
                    email: email,
                    username: username,
                    password: password
                })

                res.status(200).
                    json({ success: "user created" })

            }

        } catch (error) {

            console.log(error)
            res.status(500).json({ error: "something went wrong" })

        }



    },


    /* -------------------------------- ADD TASK -------------------------------- */

    taskForm: async (req, res) => {

        try {


            const { taskname, assigned, description, time } = req.body


            console.log(req.body, "iddd")
            await taskSchemaa.create({


                userId: assigned,
                taskname: taskname,
                description: description,
                time: time,
                created: Date.now(),
                status: 'assigned'


            })

        } catch (error) {

            console.log(error, "error")

        }

    },


    /* ------------------------------- VIEW USERS ------------------------------- */

    viewUsers: async (req, res) => {

        try {

            let users = await userSchemma.find()

            res.status(200).
                json({ success: "user created", users })

        } catch (error) {
            console.log(error, "errro")
            res.status(500).json({ error: "something went wrong" })


        }
    },


    weeklyReports: async (req, res) => {

        try {

            let weeklyData = await taskSchemaa.aggregate([{
                $match: {
                    created: {
                        $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                    }
                }
            },{


                $group: {

                    _id: { "date" : {$dateToString: { format: "%Y-%m-%d", date: "$created" } }, "status" : '$status' },
                    totalTime: { $sum: '$totalTime' },
                    total: { $sum: '$time' },
                    count: { $sum: 1 },

                }
            }
            ])

        console.log(weeklyData, "data")

        res.status(200).json({weeklyData})
    } catch(error) {

        console.log(error, "error")

    }
},

 monthlyReport : (req,res)=>{

    try{

    }catch(error){

    }
 }






}

module.exports = controller