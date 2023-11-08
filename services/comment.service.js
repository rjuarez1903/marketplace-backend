import { Comment } from '../models/Comment.js';
import { Service } from '../models/Service.js';
import { updateServiceRatings } from '../utils/updateServiceRatings.js';

export const findServiceById = async (serviceId) => {
  return await Service.findById(serviceId).lean();
};

export const findCommentsByServiceId = async (serviceId) => {
  return await Comment.find({ serviceId }).lean();
};

export const createNewComment = async (serviceId, content, rating) => {
  const comment = await Comment.create({ serviceId, content, rating });
  const service = await Service.findById(serviceId);
  await updateServiceRatings(service, rating);
  return comment;
};

export const findCommentById = async (commentId) => {
  return await Comment.findById(commentId);
};

export const updateCommentById = async (commentId, isBlocked) => {
  const comment = await Comment.findById(commentId);
  comment.isBlocked = isBlocked;
  await comment.save();
  return comment;
};

export const checkUserAuthorization = (serviceUserId, userId) => {
  return serviceUserId.toString() === userId;
};
