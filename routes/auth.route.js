import { Router } from "express";
import {
  login,
  register,
  requestPasswordReset,
  validateToken,
  resetPassword,
} from "../controllers/auth.controller.js";
import {
  loginBodyValidator,
  registerBodyValidator,
} from "../middlewares/validationResultExpress.js";

const router = Router();

router.post("/register", registerBodyValidator, register);
router.post("/login", loginBodyValidator, login);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/resetPassword", resetPassword);
router.post("/validateToken", validateToken);

export default router;
