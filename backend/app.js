//get express
const express = require("express");
const app = express();
//JSON parser middleware
app.use(express.json());
//CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, Authorize, X-Requested-With"
  );
  next();
});

//setup mongo db
const mongoose = require("./database/mongoose");
const List = require("./database/models/list");
const Task = require("./database/models/task");

//------------------------- LIST API -------------------------
//retorna todos items list
app.get("/api/lists", (req, res) => {
  List.find({})
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.error(err);
    });
});

//retorna list por id
app.get("/api/lists/:listId", (req, res) => {
  List.find({ _id: req.params.listId })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.error(err);
    });
});

//adiciona item na lista
app.post("/api/lists", (req, res) => {
  new List({ title: req.body.title })
    .save()
    .then((list) => {
      res.status(201).send(list);
    })
    .catch((err) => {
      console.error(err);
    });
});

//atualiza a lista pelo id
app.patch("/api/lists/:listId", (req, res) => {
  List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.error(err);
    });
});

//deleta a lista pelo id
app.delete("/api/lists/:listId", (req, res) => {
  //deleta as tasks dentro da lista
  const deleteAllTasks = (list) => {
    Task.deleteMany({ _listId: req.params.listId })
      .then((list) => {
        return list;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //deleta lista
  List.findOneAndDelete({ _id: req.params.listId })
    .then((list) => {
      res.status(200).send(deleteAllTasks(list));
    })
    .catch((err) => {
      console.error(err);
    });
});

//------------------------- TASK API -------------------------
//retorna as tasks de acordo com o id da lista
app.get("/api/lists/:listId/tasks", (req, res) => {
  Task.find({ _listId: req.params.listId })
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      console.error(err);
    });
});

//retorna items da task pelo id da lista e o id da task
app.get("/api/lists/:listId/tasks/:taskId", (req, res) => {
  Task.find({
    $and: [{ _listId: req.params.listId }, { _id: req.params.taskId }],
  })
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      console.error(err);
    });
});

//adiciona task na lista pelo id da lista
app.post("/api/lists/:listId/tasks", (req, res) => {
  new Task({ _listId: req.params.listId, title: req.body.title })
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((err) => {
      console.error(err);
    });
});

//atualiza itens da lista pelo id e o id da task
app.patch("/api/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    { $and: [{ _listId: req.params.listId }, { _id: req.params.taskId }] },
    { $set: req.body }
  )
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      console.error(err);
    });
});

//deleta task da lista, passando o id da lista e da task
app.delete("/api/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndDelete({ $and: [{ _listId: req.params.listId }, { _id: req.params.taskId }] })
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      console.error(err);
    });
});

// inicia porta 3000 para ouvir requisições
app.listen(3000, () => {
  console.log("api listening...");
});
