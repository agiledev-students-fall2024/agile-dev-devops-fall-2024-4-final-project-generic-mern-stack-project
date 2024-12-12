const { body, validationResult } = require('express-validator');

// Validation rules for updating user settings
const validateUserSettings = [
  // About Me
  body('aboutMe')
    .optional()
    .isString()
    .withMessage('About Me must be a string')
    .isLength({ max: 500 })
    .withMessage('About Me cannot exceed 500 characters')
    .trim()
    .escape()
    .withMessage('About Me must not contain special characters'),

  // Phone Number
  body('number')
    .optional()
    .matches(/^\d{3}-\d{3}-\d{4}$/)
    .withMessage('Number must be in the format 123-456-7890'),

  // Email
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail()
    .withMessage('Email must be normalized'),

  // Other Social Media Links
  body('otherSocialMedia')
    .optional()
    .isArray()
    .withMessage('Other Social Media must be an array of URLs')
    .custom((links) => {
      if (!links.every((link) => typeof link === 'string' && /^https?:\/\/.+\..+$/.test(link))) {
        throw new Error('Each social media link must be a valid URL');
      }
      return true;
    }),

  // Friends List
  body('friendsList')
    .optional()
    .isArray()
    .withMessage('Friends List must be an array')
    .custom((list) => {
      if (!list.every((friend) => typeof friend === 'string')) {
        throw new Error('Friends List must contain only string values');
      }
      return true;
    }),

  // Profile Picture URL
  body('profilePicture')
    .optional()
    .isURL()
    .withMessage('Profile Picture must be a valid URL'),

  // Username
  body('username')
    .optional()
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_.-]*$/)
    .withMessage('Username can only contain letters, numbers, underscores, dots, and hyphens'),

  // Date of Birth
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of Birth must be a valid date in ISO8601 format')
    .toDate(),

  // Notification Preferences
  body('notificationPreferences')
    .optional()
    .isObject()
    .withMessage('Notification Preferences must be an object')
    .custom((prefs) => {
      const validKeys = ['email', 'sms', 'push'];
      const invalidKeys = Object.keys(prefs).filter((key) => !validKeys.includes(key));
      if (invalidKeys.length > 0) {
        throw new Error(`Invalid notification preferences: ${invalidKeys.join(', ')}`);
      }
      return true;
    }),

  // Status
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'banned'])
    .withMessage('Status must be one of: active, inactive, banned'),
];

// Middleware to handle validation results
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

module.exports = {
  validateUserSettings,
  handleValidationErrors,
};
