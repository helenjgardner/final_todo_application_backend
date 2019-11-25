const express=require("express");
const cors=require("cors");
const serverless=require("serverless-http");
const bodyParser=require("body-parser");
const mysql = require("mysql");

const app=express();

app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.HOST, 
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "todo_app"
});

// req dont need this for get
app.get("/tasks", function(req, response) {
  connection.query("SELECT * FROM task", function(err, data) {
    if (err) {
      console.log("Error fetching task", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});

app.delete("/tasks/:taskId", function(request,response){
  // delete task
  const id=request.params.taskId;
  response.status(200).send("Received request to delete task " + id);
});

app.post("/tasks", function(request, response){
   // new task
   const task=request.body;
   response.status(201).send("Created a new task with " + task.text);
});

// my fields from state in app.js
// text
// completed
// dateDone
// dateDue
// id
// possibly userid
app.put("/tasks/:taskId", function(request,response){
  // update task
  const task=request.body;
  const id=request.params.taskId;
  response.status(200).send("Received a request to update task " + id + " with " + task.text + task.completed)
});
module.exports.tasks=serverless(app);
