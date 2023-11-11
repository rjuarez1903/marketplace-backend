import multer from 'multer';
import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { getUser, updateUser, updateUserProfileImage, getPublicUserData } from "../controllers/user.controller.js";
import { updateUserBodyValidator } from "../middlewares/validationResultExpress.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", requireToken, getUser);
router.get("/:id", getPublicUserData);
router.patch("/", requireToken, updateUserBodyValidator, updateUser);
router.patch("/profileImage", requireToken, upload.single('file'), updateUserProfileImage);

export default router;
