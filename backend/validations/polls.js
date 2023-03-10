const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validatePollInput = [
    check("polls")
        .exists({ checkFalsy: true })
        .withMessage("A poll must be selected"),
    handleValidationErrors,
];

module.exports = validatePollInput;

// Path: backend/routes/api/polls.js
