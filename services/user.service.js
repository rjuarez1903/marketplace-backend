import { User } from '../models/User.js';

export const findUserById = async (id) => {
  return await User.findById(id).lean();
};

export const updateUserById = async (id, updateData) => {
  const user = await User.findById(id);
  Object.assign(user, updateData);
  await user.save();
  return user.toObject();
};

export const getPublicProfile = (user) => {
  const { firstName, lastName, degree, experience } = user;
  return { firstName, lastName, degree, experience };
};
