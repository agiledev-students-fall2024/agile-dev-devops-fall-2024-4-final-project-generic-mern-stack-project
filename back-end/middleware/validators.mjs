import { body, validationResult } from "express-validator";

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

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};