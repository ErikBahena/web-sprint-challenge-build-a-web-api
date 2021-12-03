// Write your "projects" router here!
const express = require("express");

const router = express.Router();

const ProjectsDAFs = require("./projects-model");

// middleware
const {
  validateReqId,
  validateProjectPost,
  validateProjectPut,
} = require("./projects-middleware");

// get all projects
router.get("/", (req, res, next) => {
  ProjectsDAFs.get()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => next(err));
});

// get project by id
router.get("/:id", validateReqId, (req, res, next) => {
  ProjectsDAFs.get(req.params.id)
    .then((project) => res.status(200).json(project))
    .catch((err) => next(err));
});

// post a new project
router.post("/", validateProjectPost, (req, res, next) => {
  ProjectsDAFs.insert(req.body)
    .then((newPost) => res.status(201).json(newPost))
    .catch((err) => next(err));
});

// update a project
router.put("/:id", validateProjectPut, (req, res, next) => {
  ProjectsDAFs.update(req.params.id, req.body)
    .then((updatedPost) => res.status(200).json(updatedPost))
    .catch((err) => next(err));
});

// delete a project
router.delete("/:id", validateReqId, (req, res) => {
  ProjectsDAFs.remove(req.params.id)
    .then((count) => res.status(200).json(count))
    .catch((err) => next(err));
});

// get the actions in a project
router.get("/:id/actions", (req, res) => {
  ProjectsDAFs.getProjectActions(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch((err) => next(err));
});

module.exports = router;
