const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "todo_app"
});

// request not needed this for get
app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function (err, data) {
    if (err) {
      console.log("Error fetching task", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        tasks: data
      });
    }
  });
});

app.delete("/tasks/:taskId", function (request, response) {
  const id = request.params.taskId;
  connection.query("DELETE FROM task WHERE id = ?", [id], function (err, results, fields) {
    if (err) {
      console.log("Error fetching task", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json()
    }
  });
});


// my fields
// text
// completed
// dateDone
// dateDue
// userid
// id

// new task
app.post("/tasks", function (request, response) {
  // assuming one task coming in on body is one object
  // completed is default false and dateDone is default blank
  // taskid is autoincrement
  const textValue = request.body.text;
  // *** NOTE FOR LATER dateDue is default value in react app - revisit
  const dateDue = request.body.dateDue;
  const userid = request.body.userid;

  const query = "INSERT INTO task (text, completed, dateDone, dateDue, userid) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [textValue, false, "", dateDue, userid], function (err, results, fields) {
    if (err) {
      console.log("Error fetching task", err);
      response.status(500).json({
        error: err
      });
    } else {
      // respond with task id
      response.status(201).json({
        taskID: results.insertId,
        text: textValue,
        dateDue: dateDue,
        completed: false,
        dateDone: "",
        userid: userid
      });
    }
  });
});


app.put("/tasks/:taskId", function (request, response) {
  // update task
  const task = request.body;
  const id = request.params.taskId;
  response.status(200).send("Received a request to update task " + id + " with " + task.text + task.completed)
});
module.exports.tasks = serverless(app);
