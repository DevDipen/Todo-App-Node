//s1: require imports
//s2: Setup connection to database
//s3: Create routes,controllers,models
//s4: Setup connection for server

const express=require("express");
require("dotenv").config();
require("./databaseConnector.js");

const cors=require("cors");
const todoRouter=require("./routes/todoRouter.js")
const {port}= process.env || {port: 3050};

const app=express();




app.use(cors());
app.use(express.json());
app.use("/api",todoRouter);



app.listen(port,()=>{
    console.log("Server is Running");
});

app.get("/",(req,res)=>{
    res.send("Inside app.get");
});
