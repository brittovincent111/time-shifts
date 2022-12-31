const mongoose = require('mongoose')
const { Schema } = mongoose;


const taskSchema = new Schema({
   
    userId: {
        type: String,
        required: true

    },  taskname : {

        type:String

    },
    description : {
        type:String
    },
    time : {
       
        type:Number
    },
    created : {
       
        type:Date
    },
    started : {
        type :Date
    },
    completed :{
        type : Date
    },
    totalTime :{
        type : Number
    },
    status:{
        type:String
    }
})


const taskSchemaa = mongoose.model('task', taskSchema)

module.exports = taskSchemaa