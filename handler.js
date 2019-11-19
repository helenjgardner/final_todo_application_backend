const express=require("express");
const cors=require("cors");
const serverless=require("serverless-http");
const bodyParser=require("body-parser");

const app=express();

app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json());

app.get("/tasks",function(request,response){
   response.status(200).send({
     tasks: [
       {id: 1, text:"Clean the car", completed: false, dateDue:"2019-11-30", dateDone:""},
       {id: 2, text:"buy lunch", completed: false, dateDue:"2019-11-29", dateDone:""},
       {id: 3, text:"cut hair", completed: true, dateDue:"2019-11-11", dateDone:"2019-11-19"}
     ]
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
