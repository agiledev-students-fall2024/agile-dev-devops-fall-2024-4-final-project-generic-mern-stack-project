import { body, validationResult } from "express-validator";

// Not used yet
// User validation rules
export const validateUser = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required"),
  body("email")
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Not used yet
// Recipe validation rules
export const validateRecipe = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Recipe name is required"),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be an array with at least one item"),
  body("steps")
    .isArray({ min: 1 })
    .withMessage("Steps must be an array with at least one step"),
  body("cuisine")
    .isString()
    .notEmpty()
    .withMessage("Cuisine is required"),
  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
];

// Validation rules for updating user profile
export const validateUpdateProfile = [
  body("userId")
    .isMongoId()
    .withMessage("Valid user ID is required"),
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  body("age")
    .optional()
    .isInt({ min: 13 })
    .withMessage("Age must be at integer of at least 13"),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  body("bio")
    .optional()
    .isString()
    .withMessage("Bio must be a string"),
];

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};