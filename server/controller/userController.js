const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchemma = require('../schema/userSchema')
const moment = require('moment')
const taskSchemaa = require('../schema/taskSchema')

const controller = {


    /* ------------------------------- USER LOGIN ------------------------------- */


    userLogin: async (req, res) => {

        try {
            console.log(req.body, "req.body")
            const {
                email,
                password
            } = req.body

            let checkEmail = await userSchemma.
                findOne({ email: email })

            if (checkEmail) {

                const checkPassword = await bcrypt.
                    compare(password, checkEmail.password)

                if (checkPassword) {

                    const id = checkEmail._id
                    const UserToken = jwt.sign({ id },
                        process.env.JWT_KEY_USER, {
                        expiresIn: "365d",
                    })
       
                    /* --------------------------- login time updating -------------------------- */
                let details = {

                    date : moment(new Date()).format('l'),
                    in: Date.now(),
                    status : 'ongoing'
                }

                    await userSchemma.updateOne({ email: email } ,
                         {$push:{attentance:
                           details
                          }})
                    console.log(UserToken)
                    res.status(200).
                        json({ UserToken: UserToken, user: checkEmail })
                } else {

                    res.status(401).
                        json({ error: "wrong password" })
                }

            } else {

                res.status(401).
                    json({ error: "Email id doesn't exist" })

            }

        } catch (error) {
            
            console.log(error , "error")
            res.status(500).
                json({ error: "something went wrong" })

        }
    },

    /* ----------------------- GET TASKS FOR SINGLE USERS ----------------------- */

    getTasks : async(req,res)=>{
       
        try{

           let taskView =  await taskSchemaa.find({userId: req.params.id , status :req.params.type })
        //    console.log(user , "user")
       
           

         console.log(taskView , "viewww")


           res.status(200).json({taskView})



        }catch(error){

     console.log(error , "errror")
        }
    },

    updateTask: async(req,res)=>{

        console.log(req.body , "body")

        try{

            let taskView =  await taskSchemaa.findOne({ _id:req.body.taskId ,userId: req.body.userId  })
      

           console.log(taskView , "viewwwsssss")
           if(taskView.status == "assigned"){
               
               taskView.status = req.body.status ;
               taskView.started = Date.now()

           }else{
            

            let time = new Date(Date.now()).getTime() - new Date(taskView.started).getTime()

            const differenceInMinutes = Math.round(time / 1000 / 60)

            console.log(time , differenceInMinutes , "ggggggggg" )

            taskView.completed = Date.now()
            taskView.status = req.body.status ;
            taskView.totalTime = differenceInMinutes



           }

           await taskView.save()

         console.log(taskView , "viewww")


           res.status(200).json({success : "updated"})

        }catch(error){
            console.log(error , "error")


        }
    }





}

module.exports = controller