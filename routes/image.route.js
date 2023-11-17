import multer from 'multer';
import { Router } from "express";
import { uploadImage, send } from "../controllers/image.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), uploadImage);
router.post('/mail', send)

export default router;