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
       {id: 1, text:"Clean the car", completed: false, dateDue:"2019-11-30"},
       {id: 2, text:"buy lunch", completed: false, dateDue:"2019-11-29"},
       {id: 3, text:"cut hair", completed: true, dateDue:"2019-11-11"},
     ]
   });
});

app.delete("/tasks/:taskId", function(request,response){
  // delete task
  const id=request.params.taskId;
  response.status(200).send("Received request to delete task" +id);
});

app.post("/tasks", function(request, response){
   // new task
   const task=request.body;
   response.status(201).send("created a new task with " + task.text);
});
// add put echoing something back - maybe all things
// add new repo and push


module.exports.tasks=serverless(app);
