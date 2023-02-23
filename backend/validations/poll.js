const { body } = require('express-validator');

// Validate poll creation/update request body
    exports.validatePoll = [
    body('question').trim().notEmpty().withMessage('Question is required'),
    body('options').isArray({ min: 2 }).withMessage('At least two options are required'),
    body('options.*.text').trim().notEmpty().withMessage('Option text is required'),
    body('options.*.votes').optional().isInt({ min: 0 }).withMessage('Votes must be a positive integer')
];
