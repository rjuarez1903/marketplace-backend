import * as CommentService from "../services/comment.service.js";
import { handleErrorResponse } from "../utils/handleErrorResponse.js";

export const getCommentsByServiceId = async (req, res) => {
  try {
    const service = await CommentService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    let comments = await CommentService.findCommentsByServiceId(
      req.params.serviceId
    );
    const modifiedComments = comments.map((comment) => {
      if (comment.isBlocked) {
        const { content, ...rest } = comment; 
        return rest;
      }
      return comment; 
    });

    return res.json({ comments: modifiedComments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const getAllCommentsByServiceId = async (req, res) => {
  try {
    const service = await CommentService.findServiceById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    if (!CommentService.checkUserAuthorization(service.userId, req.userId)) {
      return res
        .status(403)
        .json({ message: "No autorizado para ver todos los comentarios" });
    }
    const comments = await CommentService.findCommentsByServiceId(
      req.params.serviceId
    );
    return res.json({ comments });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const comment = await CommentService.createNewComment(
      req.params.serviceId,
      content,
      rating
    );
    return res.json({ comment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await CommentService.findCommentById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    const service = await CommentService.findServiceById(comment.serviceId);
    if (!CommentService.checkUserAuthorization(service.userId, req.userId)) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar este comentario" });
    }
    const updatedComment = await CommentService.updateCommentById(
      req.params.commentId,
      req.body.isBlocked
    );
    return res.json({ updatedComment });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
