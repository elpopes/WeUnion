const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

// validateGriefInput uses check to validate the keys in the body of a request to create/edit a grievance

const validateGriefInput = [
  check("text")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage("Grief must be between 5 and 140 characters"),
  handleValidationErrors,
];

module.exports = validateGriefInput;