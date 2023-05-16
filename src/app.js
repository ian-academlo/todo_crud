const express = require("express");
const db = require("./utils/database");
const Todos = require("./models/todos.model");

Todos;

// Probar la conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => console.log(error));

// Sincronizar los modelos en la base de datos
db.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo funcionando OK");
});

// Crear un todo
app.post("/api/v1/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    await Todos.create({ title, description });
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// Obtener todas las tareas
app.get("/api/v1/todos", async (req, res) => {
  try {
    const todos = await Todos.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// obtener una tarea por su id
app.get("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

// actualizar el estado de una tarea
app.put("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    await Todos.update(
      { completed },
      {
        where: { id },
      }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// Eliminar una tarea
app.delete("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
