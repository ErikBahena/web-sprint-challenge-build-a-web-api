const { get } = require("./projects-model");

const validateReqId = (req, res, next) => {
  get(req.params.id)
    .then((project) => {
      project
        ? next()
        : res.status(404).json({ message: "no project exists with that id" });
    })
    .catch((err) => next(err));
};

const validateProjectPost = (req, res, next) => {
  req.body.name && req.body.description
    ? next()
    : res.status(400).json({
        message: "name and description are required when making a new project",
      });
};

const validateProjectPut = (req, res, next) => {
  req.body.name && req.body.description && req.body.hasOwnProperty("completed")
    ? next()
    : res.status(400).json({
        message: "name and description are required when making a new project",
      });
};

module.exports = { validateReqId, validateProjectPost, validateProjectPut };
