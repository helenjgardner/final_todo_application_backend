# Todo Application - Backend

This is the back end API of a Todo Application, built throughout the [Tech Returners](https://techreturners.com) Your Journey Into Tech course. It is consumed by a front end React application, available [here](https://github.com/helenjgardner/final_todo_application) and connects to an RDS Database.

The hosted version of the application is available here: [https://helenjgardner.github.io/final_todo_application/](https://helenjgardner.github.io/final_todo_application/).

### Technology Used

This project uses the following technology:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- Mysql library
- AWS Lambda and API Gateway
- AWS RDS
- ESLint

### Endpoints

The API exposes the following endpoints:

---

##### GET /tasks

[https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Responds with JSON containing all tasks in the Database.

---

##### POST /tasks

[https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Will create a new task when sent a JSON payload in the format:

```json
{
	"text": "a new task",
	"dateDue": "2019-12-24",
	"userid": "helen.gardner",
	"dateDone":"",
	"completed": false
}
```

---

##### DELETE /tasks/:taskId

[https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId](https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId)

Deletes the task of the given ID.

---

##### PUT /tasks/:taskId

[https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId](https://ofe1t56so4.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId)

Will update a task when sent a JSON payload in the format:

```json
{
	"text": "edited task text",
	"completed": true,
	"dateDue": "2019-11-30",
	"dateDone": "2019-11-30",
	"userid":"helen.gardner"
}
```
