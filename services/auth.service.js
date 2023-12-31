import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenManager.js";

export const createUserService = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user.toObject();
};

export const authenticateUserService = async (userId, res) => {
  const { token, expiresIn } = generateToken(userId);
  return { token, expiresIn };
};

export const findUserByIdService = async (userId) => {
  return await User.findById(userId);
}

export const findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};

export const comparePasswordService = async (user, password) => {
  return await user.comparePassword(password);
};
