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

// request not needed this for get / read 
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

// create new task
app.post("/tasks", function (request, response) {
  // assuming one task coming in on body is one object
  // taskid is autoincrement
  const textValue = request.body.text;
  const dateDue = request.body.dateDue;
  const completed = request.body.completed;
  const dateDone = request.body.dateDone;
  const userid = request.body.userid;

  const query = "INSERT INTO task (text, completed, dateDone, dateDue, userid) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [textValue, completed, dateDone, dateDue, userid], function (err, results, fields) {
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
        completed: completed,
        dateDone: dateDone,
        userid: userid
      });
    }
  });
});


app.put("/tasks/:taskId", function (request, response) {
  // update task
  const textValue = request.body.text;
  const dateDue = request.body.dateDue;
  const completed = request.body.completed;
  const dateDone = request.body.dateDone;
  const id = request.params.taskId;
  const query = "update task  SET text=?, completed=?, dateDone=?, dateDue=?  WHERE id=?";
  connection.query(query, [textValue, completed, dateDone, dateDue, id], function (err, results, fields) {
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
module.exports.tasks = serverless(app);
