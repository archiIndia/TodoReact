// const { default: mongoose } = require('mongoose')
const {Schema,model}= require('mongoose')

const Todoschema = new Schema({
    task: String,
    priority: String,
    description: String,
    status:{
        type: String,
        // enum means only these values can be stored in this field
        enum : ["A","D"],
        default : "A",
        require : true,
    }
})

const TodoModel= model("Today",Todoschema)
module.exports= TodoModel;