const express=require("express");
const Router=express.Router();
const Controller=require("../controllers/todoController.js")


Router.get("/todos",Controller.getTodos);
Router.post("/addtodo",Controller.addTodo);
Router.post("/deleteTodo",Controller.deleteTodo);
Router.post("/updateTodo",Controller.updateTodo);

module.exports= Router


