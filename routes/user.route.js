import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { updateUserBodyValidator } from "../middlewares/validationResultExpress.js";

const router = Router();

router.get("/", requireToken, getUser);
router.patch("/", requireToken, updateUserBodyValidator, updateUser);

export default router;
