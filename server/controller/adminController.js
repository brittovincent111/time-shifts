const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const taskSchemaa = require('../schema/taskSchema')
const userSchemma = require('../schema/userSchema')

const controller = {


    /* ------------------------------- ADMIN LOGIN ------------------------------ */

    AdminLogin: async (req, res) => {

        const { email, password } = req.body

        try {

            if (process.env.ADMIN_EMAIL == email) {
                if (process.env.ADMIN_PASS == password) {
                    const id = process.env.ADMIN_ID
                    const token = jwt.sign({ id },
                        process.env.JWT_KEY_ADMIN, {
                        expiresIn: "365d",
                    })

                    console.log(token, "tokenn")
                    res.json({ token: token, auth: true })

                } else {

                    res.status(401).
                        json({ error: "Wrong password" })

                }

            } else {

                res.status(401).
                    json({ error: "Email Wrong" })

            }

        } catch (e) {
            res.status(500).
                json({ error: "server error" })
            console.log(e)

        }
    },


/* -------------------------- CREATE USER BY ADMIN -------------------------- */
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
            res.status(500).
                json({ error: "something went wrong" })

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
        
            res.status(500).
                json({ error: "something went wrong" })

        }

    },


    /* ------------------------------- VIEW USERS ------------------------------- */

    viewUsers: async (req, res) => {

        try {

            let users = await userSchemma.find()

            res.status(200).
                json({ success: "user created", users })

        } catch (error) {

            res.status(500).
                json({ error: "something went wrong" })


        }
    },

    /* ----------------------------- WEEKLY REPORTS ----------------------------- */


    weeklyReports: async (req, res) => {

        try {

            let weeklyData = await taskSchemaa.aggregate([{
                $match: {
                    created: {
                        $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                    }
                }
            }, {


                $group: {

                    _id: {
                        "date": {
                            $dateToString:
                                { format: "%Y-%m-%d", date: "$created" }
                        },
                        "status": '$status'
                    },
                    totalTime: { $sum: '$totalTime' },
                    total: { $sum: '$time' },
                    count: { $sum: 1 },

                }
            }
            ])


            res.status(200).
                json({ weeklyData })

        } catch (error) {

            res.status(500).
            json({ error: "something went wrong" })

        }
    },

  /* ----------------------------- MONTHLY REPORTS ---------------------------- */


    monthlyReport: async (req, res) => {

        try {

            let monthlyData = await taskSchemaa.aggregate([{
                $match: {
                    created: {
                        $gte: new Date((new Date().getTime() - (365 * 24 * 60 * 60 * 1000)))
                    }
                }
            }, {


                $group: {

                    _id: {
                        "date": {
                            $dateToString:
                                { format: "%Y-%m", date: "$created" }
                        },
                        "status": '$status'
                    },
                    totalTime: { $sum: '$totalTime' },
                    total: { $sum: '$time' },
                    count: { $sum: 1 },

                }
            }
            ])


            res.status(200).
                json({ monthlyData })
        } catch (error) {

             res.status(500).
                json({ error: "something went wrong" })

        }
    },

    /* -------------------------- TASK STATISTICS GRAPH ------------------------- */

    taskGraph: async (req, res) => {
        try {

            let data = await taskSchemaa.aggregate([
                {
                    $group: {
                        _id: { status: "$status" },
                        count: { $sum: 1 }
                    }
                }
            ])
            res.status(200).json(data)


        } catch (error) {


            res.status(500).
            json({ error: "something went wrong" })

        }

    },

    /* ---------------------------- DASHBOARD DETAILS --------------------------- */

    dashboardDetails: async (req, res) => {

        try {

            let userCount = await userSchemma.find().count()
            let completedCount = await taskSchemaa.find({ status: "completed" }).count()
            let totalCount = await taskSchemaa.find().count()



            res.status(200).json({ userCount, completedCount, totalCount })

        } catch (error) {

            res.status(500).
            json({ error: "something went wrong" })

        }
    },

    /* -------------------------- WORK COMPLETED GRAPH -------------------------- */

    workCompletedGraph : async(req,res)=>{


        try{

            let  completion= await taskSchemaa.aggregate([{ 
                $match: {
                    created: {
                        $gte: new Date((new Date().getTime() - (4 * 24 * 60 * 60 * 1000)))
                    },
                     status : "completed"
                }
            },{


                $group: {

                    _id: {
                        "date": {
                            $dateToString:
                                { format: "%Y-%m-%d", date: "$created" }
                        }
                        
                    },
                    
                    count: { $sum: 1 },

                }
            }
        
        ])
        

        res.status(200).json(completion)



        }catch(error){

            res.status(500).
            json({ error: "something went wrong" })
        }
    }






}

module.exports = controller