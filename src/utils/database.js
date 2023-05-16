const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  username: "iannacus",
  database: "todo_crud",
  port: 5432,
  password: "root",
  dialect: "postgres",
});

module.exports = db;
