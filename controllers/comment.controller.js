import { Comment } from "../models/Comment.js";
import { Service } from "../models/Service.js";
import { updateServiceRatings } from "../utils/updateServiceRatings.js";
import { handleErrorResponse } from "../utils/handleErrorResponse.js";

export const getCommentsByServiceId = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).lean();
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    let comments = await Comment.find({
      serviceId: req.params.serviceId,
    }).lean();
    // Devuelve exclusivamente los comentarios que no estén bloqueados
    // comments = comments.filter((comment) => comment.isBlocked === false);
    return res.json({ comments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getAllCommentsByServiceId = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).lean();
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const { userId } = service;
    if (userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized to view all comments",
      });
    }
    const comments = await Comment.find({
      serviceId: req.params.serviceId,
    }).lean();
    return res.json({ comments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createComment = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    const { content, rating } = req.body;
    const comment = await Comment.create({
      serviceId: req.params.serviceId,
      content,
      rating,
    });
    await updateServiceRatings(service, rating);
    return res.json({ comment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    const service = await Service.findById(comment.serviceId);
    const { userId } = service;
    if (userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized to update this comment",
      });
    }
    const { isBlocked } = req.body;
    comment.isBlocked = isBlocked;
    await comment.save();
    return res.json({ comment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};