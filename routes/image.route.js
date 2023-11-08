import multer from 'multer';
import { Router } from "express";
import { uploadImage } from "../controllers/image.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), uploadImage);


export default router;