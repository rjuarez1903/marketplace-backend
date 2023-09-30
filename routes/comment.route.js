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

// GET      /api/v1/comments/:serviceId       all unblocked comments of a service
// GET      /api/v1/comments/:serviceId/all   all comments of a service
// POST     /api/v1/comments/:serviceId       create comment
// PATCH    /api/v1/comments/:commentId       update comment

router.get("/:serviceId", getCommentsByServiceId);
router.get("/:serviceId/all", requireToken, getAllCommentsByServiceId);
router.post("/:serviceId", createCommentBodyValidator, createComment);
router.patch("/:commentId", requireToken, updateComment);

export default router;
