const { set } = require("mongoose");
const todoSchema = require("../models/todoSchema.js");

exports.addTodo = (req, res) => {
  const { todoTitle, isCompleted } = req.body;

  const Todo = new todoSchema({ todoTitle, isCompleted });
  Todo.save()
    .then((todo) => res.status(200).json({ msg: "todo added" }))  //status code 200 means all ok;
    .catch((err) => res.status(400).json({ msg: "error adding todo" }));  //404=not found 400=bad request;
};

exports.getTodos = (req, res) => {
  todoSchema
    .find()
    .then((todos) => res.json({ todos }))
    .catch((err) => console.log(err));
};

exports.deleteTodo = (req,res)=>{
  // const {_id}=req.body;
  // console.log(_id);

  // todoSchema.findByIdAndDelete(_id)
  // .then((todo)=>{
  //   if(todo){
  //     return res.json({msg: "todo deleted"});
  //   }
  //   return res.json({msg: "Todo not found"});


  // })
  // .catch((err) => res.status(400).json({ msg: "error deleting todo" })); 

  const {id}= req.body;
  if(id){
    todoSchema.findOne({_id: id})
    .then((todo)=>{

      if(todo){
        todoSchema.deleteOne({_id: id})
        .then(()=> res.status(200).json({msg: "Todo Deleted"}))       
      }else
      return res.json({msg: "Todo not found"});

    })
    .catch((err)=>res.status(400).json({msg: "Error Deleting Todo"}))
  }else
  return res.status(400).json({msg: "Invalid ID! "})

}

exports.updateTodo=(req,res)=>{
  const {id}=req.body;
  if(id){
    todoSchema.findOne({_id: id})
    .then((todo)=>{

      if(todo){
        todoSchema.updateOne({_id: id},{"$set":{isCompleted: true}})
        .then(()=> res.status(200).json({msg: "Todo Updated"}))       
      }else
      return res.json({msg: "Todo not found"});

    })
    .catch((err)=>res.status(400).json({msg: "Error Updating Todo"}))
  }else
  return res.status(400).json({msg: "Invalid ID! "})

}