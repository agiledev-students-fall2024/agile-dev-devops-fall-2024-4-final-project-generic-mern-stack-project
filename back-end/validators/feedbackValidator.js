const { body, validationResult } = require('express-validator');

// Validation rules for feedback form
const validateFeedback = [
  body('answer1')
    .notEmpty()
    .withMessage('Answer 1 is required')
    .isString()
    .withMessage('Answer 1 must be a string'),
  body('answer2')
    .notEmpty()
    .withMessage('Answer 2 is required')
    .isString()
    .withMessage('Answer 2 must be a string'),
  body('answer3')
    .notEmpty()
    .withMessage('Answer 3 is required')
    .isString()
    .withMessage('Answer 3 must be a string'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateFeedback,
  handleValidationErrors,
};
