const express = require("express");
const server = express();

// middleware
const errorHandling = require("./globalmiddleware");
server.use(express.json());

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

// global error handling

// since both routers required the same type of "catch all error handler", I decided to bring them into one place, making the code as dry as possible.

server.use(errorHandling);

module.exports = server;
