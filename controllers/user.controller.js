import { findUserById, updateUserById, getPublicProfile } from '../services//user.service.js';
import { upload } from '../services/cloudinary.js';

export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPublicUserData = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const publicData = getPublicProfile(user);
    return res.json(publicData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { degree, experience } = req.body;
    const leanUser = await updateUserById(req.userId, { degree, experience });
    return res.json({ leanUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfileImage = async (req, res) => {
  try {
    const { userId } = req;
    const imageUrl = await upload(req.file.buffer);
    const updatedUser = await updateUserById(userId, { profileImgUrl: imageUrl });
    return res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
