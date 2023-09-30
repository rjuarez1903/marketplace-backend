import { User } from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getPublicUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { firstName, lastName, degree, experience } = user;
    return res.json({ firstName, lastName, degree, experience });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { degree, experience } = req.body;
    user.degree = degree;
    user.experience = experience;
    await user.save();
    const leanUser = user.toObject();
    return res.json({ leanUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
