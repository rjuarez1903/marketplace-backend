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
  body("firstName", "El nombre es requerido").isAlpha(),
  body("lastName", "El apellido es requerido").isAlpha(),
  body("email", "Por favor ingresá un correo electrónico válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  body("phoneNumber", "Formato de número de teléfono inválido.").isNumeric(),
  validationResultExpress,
];

export const loginBodyValidator = [
  body("email", "Por favor ingresá un correo electrónico válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  validationResultExpress,
];

export const updateUserBodyValidator = [
  body("degree", "El título es requerido").trim().notEmpty(),
  body("degree", "El título no puede tener más de 50 caracteres").isLength({
    max: 50,
  }),
  body("experience", "La experiencia").trim().notEmpty(),
  body("experience", "La experiencia no puede tener más de 255 caracteres").isLength({
    max: 255,
  }),
  validationResultExpress,
];

export const createServiceBodyValidator = [
  body("name", "El nombre es requerido").trim().notEmpty(),
  body("name", "El nombre no puede tener más de 50 caracteres").isLength({ max: 50 }),
  body("description", "La descripción es requerida").trim().notEmpty(),
  body(
    "description",
    "La descripción no puede tener más de 255 caracteres"
  ).isLength({ max: 255 }),
  body("category", "La categoría es requerida").trim().notEmpty(),
  body("category", "Categoría inválida").isIn([
    "programacion",
    "idiomas",
    "musica",
    "matematica",
  ]),
  body("frequency", "La frecuencia es requerida.").trim().notEmpty(),
  body("frequency", "Frecuencia inválida").isIn(["unique", "weekly", "monthly"]),
  body("cost", "El costo es requerido").trim().notEmpty(),
  body("cost", "El costo debe ser al menos de $0.99").isFloat({ min: 0.99 }),
  body("type", "El tipo es requerido").trim().notEmpty(),
  body("type", "Tipo inválido").isIn(["individual", "group"]),
  body("duration", "La duración es requerida").trim().notEmpty(),
  body("duration", "Duración inválida").isFloat({ min: 0.5, max: 4 }).toFloat(),
  validationResultExpress,
];

export const createServiceContractBodyValidator = [
  body("contactEmail", "El email de contacto es requerido").trim().notEmpty(),
  body("contactEmail", "Mail de contacto inválido").isEmail().normalizeEmail(),
  body("message", "El mensaje es requerido").trim().notEmpty(),
  body("message", "El mensaje no puede tener más de 255 caracteres").isLength({
    max: 255,
  }),
  body("phoneNumber", "El número de teléfono es requerido").trim().notEmpty(),
  body("preferredContactTime", "El horario de preferencia de contacto es requerido")
    .trim()
    .notEmpty(),
  validationResultExpress,
];

export const updateServiceContractBodyValidator = [
  body("contractStatus", "Estado de contratación inválido").isIn([
    "requested",
    "completed",
    "accepted",
    "cancelled",
  ]),
  validationResultExpress,
];

export const createCommentBodyValidator = [
  body("content", "El contenido no puede tener más de 255 caracteres").isLength({
    max: 255,
  }),
  body("rating", "La calificación es requerida").trim().notEmpty(),
  body("rating", "Calificación inválida").isInt({ min: 1, max: 5 }),
  validationResultExpress,
];
