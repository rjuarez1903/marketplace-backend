import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.controller.js";
import {
  loginBodyValidator,
  registerBodyValidator,
} from "../middlewares/validationResultExpress.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.post("/register", registerBodyValidator, register);
router.post("/login", loginBodyValidator, login);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/resetPassword", resetPassword);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
