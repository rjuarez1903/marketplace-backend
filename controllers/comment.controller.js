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
    comments = comments.filter((comment) => comment.isBlocked === false);
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
