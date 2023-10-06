import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

export const registerBodyValidator = [
  body("firstName", "First name is required").isAlpha(),
  body("lastName", "Last name is required").isAlpha(),
  body("email", "Please enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 }),
  body("phoneNumber", "Invalid phone number format").isNumeric(),
  validationResultExpress,
];

export const loginBodyValidator = [
  body("email", "Please enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 }),
  validationResultExpress,
];

export const updateUserBodyValidator = [
  body("degree", "Degree is required").trim().notEmpty(),
  body("degree", "Degree cannot be more than 50 characters").isLength({
    max: 50,
  }),
  body("experience", "Experience is required").trim().notEmpty(),
  body("experience", "Experience cannot be more than 255 characters").isLength({
    max: 255,
  }),
  validationResultExpress,
];

export const createServiceBodyValidator = [
  body("name", "Name is required").trim().notEmpty(),
  body("name", "Name cannot be more than 50 characters").isLength({ max: 50 }),
  body("description", "Description is required").trim().notEmpty(),
  body(
    "description",
    "Description cannot be more than 255 characters"
  ).isLength({ max: 255 }),
  body("category", "Category is required").trim().notEmpty(),
  body("category", "Invalid category").isIn([
    "programacion",
    "idiomas",
    "musica",
    "matematica",
  ]),
  body("frequency", "Frequency is required").trim().notEmpty(),
  body("frequency", "Invalid frequency").isIn(["unique", "weekly", "monthly"]),
  body("cost", "Cost is required").trim().notEmpty(),
  body("cost", "Cost must be at least 0.99").isFloat({ min: 0.99 }),
  body("type", "Type is required").trim().notEmpty(),
  body("type", "Invalid type").isIn(["individual", "group"]),
  body("duration", "Duration is required").trim().notEmpty(),
  body("duration", "Invalid duration").isFloat({ min: 0.5, max: 4 }).toFloat(),
  validationResultExpress,
];

export const createServiceContractBodyValidator = [
  body("contactEmail", "Contact email is required").trim().notEmpty(),
  body("contactEmail", "Invalid contact email").isEmail().normalizeEmail(),
  body("message", "Message is required").trim().notEmpty(),
  body("message", "Message cannot be more than 255 characters").isLength({
    max: 255,
  }),
  body("phoneNumber", "Phone number is required").trim().notEmpty(),
  body("preferredContactTime", "Preferred contact time is required")
    .trim()
    .notEmpty(),
  validationResultExpress,
];

export const updateServiceContractBodyValidator = [
  body("contractStatus", "Invalid contract status").isIn([
    "requested",
    "completed",
    "accepted",
    "cancelled",
  ]),
  validationResultExpress,
];

export const createCommentBodyValidator = [
  body("content", "Content is required").trim().notEmpty(),
  body("content", "Content must be at least 5 characters").isLength({
    min: 5,
  }),
  body("content", "Content cannot be more than 255 characters").isLength({
    max: 255,
  }),
  body("rating", "Rating is required").trim().notEmpty(),
  body("rating", "Invalid rating").isInt({ min: 1, max: 5 }),
  validationResultExpress,
];
