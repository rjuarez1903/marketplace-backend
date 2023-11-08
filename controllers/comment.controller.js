import * as CommentService from '../services/comment.service.js';
import { handleErrorResponse } from "../utils/handleErrorResponse.js";

export const getCommentsByServiceId = async (req, res) => {
  try {
    const service = await CommentService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    let comments = await CommentService.findCommentsByServiceId(req.params.serviceId);
    comments = comments.filter((comment) => !comment.isBlocked);
    return res.json({ comments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getAllCommentsByServiceId = async (req, res) => {
  try {
    const service = await CommentService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    if (!CommentService.checkUserAuthorization(service.userId, req.userId)) {
      return res.status(403).json({ message: "Unauthorized to view all comments" });
    }
    const comments = await CommentService.findCommentsByServiceId(req.params.serviceId);
    return res.json({ comments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const comment = await CommentService.createNewComment(req.params.serviceId, content, rating);
    return res.json({ comment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await CommentService.findCommentById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const service = await CommentService.findServiceById(comment.serviceId);
    if (!CommentService.checkUserAuthorization(service.userId, req.userId)) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }
    const updatedComment = await CommentService.updateCommentById(req.params.commentId, req.body.isBlocked);
    return res.json({ updatedComment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
