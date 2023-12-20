const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {request, response} = require("express");
const port = 3000;
const session = require("express-session")
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/swagger-gui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(session({
  secret: "elsecreto",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

const tryCatch = (controller) => (req, res, next) => {
  try {
    controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};


const tasks = [
  {
    id: 1,
    title: "Tickets kaufen",
    description: "Tickets für ein Konzert kaufen.",
    done: false,
    dueDate: "2023-12-31"
  },
  {
    id: 2,
    title: "Wäsche machen",
    description: "Kleider waschen und aufhängen.",
    done: true,
    dueDate: "2023-12-15"
  },
  {
    id: 3,
    title: "Hausaufgaben",
    description: "Mathe Hausaufgaben machen",
    done: false,
    dueDate: "2024-01-15"
  }
];

let currentId = 4; // Setze die ID auf den nächsten verfügbaren Wert

app.get("/tasks", tryCatch((request, response, next) => {
  try {
    if (request.session.token !== adminCredentials.token){
      request.session.token = "This cookie is invalid"
      return response.status(403).json("UNAUTHORIZED")
    }
    console.log(tasks)
    response.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}));


app.post("/tasks", tryCatch((request, response, next) => {
  try {
    if (request.session.token !== adminCredentials.token){
      request.session.token = "This cookie is invalid"
      return response.status(403).json("UNAUTHORIZED")
    }
    const newTask = request.body;

    if (!newTask.title || newTask.title.trim() === "") {
      return response.status(406).json({ error: "Title cannot be empty" });
    }

    if (!newTask.title || !newTask.description || newTask.done == undefined || !newTask.dueDate) {
      return response.status(400).send("Bad Request");
    }

    newTask.id = currentId;
    tasks.push(newTask);
    currentId++;

    response.status(201).json(newTask);
    console.log(newTask);
  } catch (error) {
    next(error);
  }
}));
;

app.get("/tasks/:id", tryCatch((request, response, next) => {
  try {
    if (request.session.token !== adminCredentials.token){
      request.session.token = "This cookie is invalid"
      return response.status(403).json("UNAUTHORIZED")
    }
    const id = request.params.id
    const task = tasks.find(b=>b.id==id)
    if (!task){
      response.status(404).send("Couldn't find a task with this Id")
    }
    response.status(200).json(task)
    console.log(task)
  } catch (error) {
    next(error);
  }
}));

app.put("/tasks/:id", tryCatch((request, response, next) => {
  try {
    if (request.session.token !== adminCredentials.token){
      request.session.token = "This cookie is invalid"
      return response.status(403).json("UNAUTHORIZED")
    }
    const id = request.params.id;
    const updateTask = request.body;
    const task = tasks.find(b=>b.id==id)

    if (!updateTask.title || updateTask.title.trim() === "") {
      return response.status(406).json({ error: "Title cannot be empty" });
    }

    if (!updateTask.id || !updateTask.title || !updateTask.description || updateTask.done == undefined || !updateTask.dueDate) {
      return response.status(400).send("Bad Request");
    }

    if (!task){
      response.status(404).send("Couldn't find a book with this Id")
    }

    tasks[task] = updateTask;
    response.status(200).json(updateTask)
    console.log(updateTask)
  } catch (error) {
    next(error);
  }
}));

app.delete("/tasks/:id", tryCatch((request, response, next) => {
  try {
    if (request.session.token !== adminCredentials.token){
      request.session.token = "This cookie is invalid"
      return response.status(403).json("UNAUTHORIZED")
    }
    const removeTask = request.params.id
    const task = tasks.find(b=>b.id==removeTask)
    const indexToRemove = tasks.indexOf(removeTask)

    if (!task){
      return response.status(404).send("Couldn't find a Task with this Id")
    }

    tasks.splice(indexToRemove, 1);
    response.status(200).send(task)

    console.log(tasks)
  } catch (error) {
    next(error);
  }
}));

const adminCredentials = {password:"m295", token: "supersecrettoken"}

app.post("/login", tryCatch((request, response, next) => {
  try {
    const {email, password, token} = request.body;

    if (email && password === adminCredentials.password && token === adminCredentials.token){
      request.session.token = token

      return response.status(200).json({message: "You are now logged in"})
    }
    return response.status(401).json({error: "Not logged in."})
    console.log(request.body)
  } catch (error) {
    next(error);
  }
}));

app.get("/verify", tryCatch((request, response, next) => {
  try {
    if (request.session.token){
      return response.status(200).json({token: request.session.token})
    }
    request.session.token = "This cookie is invalid"
    return response.status(401).json({error: "Not logged in"})
  } catch (error) {
    next(error);
  }
}));


app.delete("/logout", tryCatch((request, response, next) => {
  try {
    request.session.token = "This cookie is invalid"
    response.status(204).send()
    console.log(request.session.token)
  } catch (error) {
    next(error);
  }
}));

app.use((req, res, next) => {       // Send user code 404 if page isn't found
  res.status(404).json({"404": "route not found"});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
