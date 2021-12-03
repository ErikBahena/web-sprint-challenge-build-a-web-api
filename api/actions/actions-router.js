const express = require("express");
const router = express.Router();

// database access functions
const ActionsDAFs = require("./actions-model");

//  middleware
const { validateReqId, validateAction } = require("./actions-middlware");

// get all actions
router.get("/", (req, res, next) => {
  ActionsDAFs.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(() => next({ message: "couldn't get actions from database" }));
});

// get actions by id
router.get("/:id", validateReqId, (req, res, next) => {
  ActionsDAFs.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => next(err));
});

router.post("/", validateAction, (req, res) => {
  ActionsDAFs.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch((err) => next(err));
});

router.put("/:id", validateAction, (req, res) => {
  ActionsDAFs.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res) => {
  ActionsDAFs.remove(req.params.id)
    .then((count) => {
      res.status(204).json(count);
    })
    .catch((err) => next(err));
});

module.exports = router;
