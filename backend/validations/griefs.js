const { check, body, validationResult } = require("express-validator");

const validateGrief = [
  body("text"),
    // .exists()
    // .withMessage("Grief text is required")
    // .isLength({ min: 5, max: 140 })
    // .withMessage("Grief must be between 5 and 140 characters"),
  body("poll.question"),
    // .exists()
    // .withMessage("Poll question is required")
    // .isLength({ min: 5, max: 140 })
    // .withMessage("Poll question must be between 5 and 140 characters"),
  body("poll.options"),
    // .exists()
    // .withMessage("Poll options are required")
    // .isArray()
    // .withMessage("Poll options must be an array")
    // .custom((options) => {
    //   if (options.length < 2) {
    //     throw new Error("Poll must have at least 2 options");
    //   }
    //   return true;
    // }),
  body("poll.selectedOptions"),
    // .isArray()
    // .withMessage("Selected options must be an array")
    // .custom((selectedOptions) => {
    //   const userIds = selectedOptions.map((option) => option.userId);
    //   if (new Set(userIds).size !== selectedOptions.length) {
    //     throw new Error("Each user can select only one option");
    //   }
    //   return true;
    // }),
  handleValidationErrors,
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
}

module.exports = validateGrief;