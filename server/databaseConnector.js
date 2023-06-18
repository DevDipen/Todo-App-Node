const mongoose = require("mongoose");
const url = `${process.env.mongoURL}/${process.env.dbName}`;
mongoose.connect(url, {}, console.log("Database Connected Successfully"));
