const { body, validationResult } = require('express-validator');

// Validation rules for contact form submission
const validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .isLength({ max: 100 })
    .withMessage('Name must be no more than 100 characters long')
    .trim()
    .escape()
    .withMessage('Name must not contain special characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail()
    .withMessage('Email must be normalized'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isString()
    .withMessage('Message must be a string')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long')
    .isLength({ max: 1000 })
    .withMessage('Message must be no more than 1000 characters long')
    .trim()
    .escape()
    .withMessage('Message must not contain special characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Phone must be a valid mobile number')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone must be between 10 and 15 characters'),
  body('subject')
    .optional()
    .isString()
    .withMessage('Subject must be a string')
    .isLength({ max: 200 })
    .withMessage('Subject must be no more than 200 characters long')
    .trim()
    .escape()
    .withMessage('Subject must not contain special characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of the following: low, medium, high'),
  body('timestamp')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Timestamp must be a valid ISO8601 date string'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation errors occurred',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

const additionalValidation = (req, res, next) => {
  if (req.body.name && req.body.name.length > 100) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name exceeds maximum length',
    });
  }
  if (req.body.email && !req.body.email.includes('@')) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email must include @ symbol',
    });
  }
  if (req.body.message && req.body.message.length < 10) {
    return res.status(400).json({
      status: 'fail',
      message: 'Message must be longer than 10 characters',
    });
  }
  next();
};

module.exports = {
  validateContact,
  handleValidationErrors,
  additionalValidation,
};
