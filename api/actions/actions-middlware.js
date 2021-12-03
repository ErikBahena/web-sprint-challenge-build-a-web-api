const { get } = require("./actions-model");

const errorHandling = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

const validateReqId = (req, res, next) => {
  get(req.params.id)
    .then((action) => {
      if (!action)
        return res
          .status(404)
          .json({ message: "no action exists with that id" });

      next();
    })
    .catch((err) => next(err));
};
const validateAction = (req, res, next) => {
  if (!req.body.notes || !req.body.description || !req.body.project_id)
    res.status(400).json({
      message:
        "notes, description, and project id are required when making a new action",
    });
  else next();
};

module.exports = { errorHandling, validateReqId, validateAction };
