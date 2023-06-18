const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const todoSchema=new Schema({
    todoTitle:{type:String,required:true},
    isCompleted:{type:Boolean,required:true, default:false}
})

const todo=mongoose.model("todo",todoSchema);

module.exports=todo;