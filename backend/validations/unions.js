const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
// validateUnionInput uses check to validate the keys in the body of a request to create/edit a union
const validateUnionInput = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("The union name must be between 2 and 50 characters"),
  //   check("members")
  //     .exists({ checkFalsy: true })
  //     .withMessage("A union member is required"),
  check("actions"),
  // .exists({ checkFalsy: true })
  // .isLength({ min: 10, max: 500 })
  // .withMessage("Union actions must be between 10 and 500 characters"),
  handleValidationErrors,
];
module.exports = validateUnionInput;
