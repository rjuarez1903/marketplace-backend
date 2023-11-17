import { Router } from "express";
import {
  getCommentsByServiceId,
  getAllCommentsByServiceId,
  createComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { createCommentBodyValidator } from "../middlewares/validationResultExpress.js";

const router = Router();

router.get("/:serviceId", getCommentsByServiceId);
router.get("/:serviceId/all", requireToken, getAllCommentsByServiceId);
router.post("/:serviceId", createCommentBodyValidator, createComment);
router.patch("/:commentId", requireToken, updateComment);

export default router;
