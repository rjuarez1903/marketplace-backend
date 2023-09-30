import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      degree: "",
      experience: "",
    });
    await user.save();
    console.log(user);
    const leanUser = user.toObject();
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);
    console.log("OK");
    return res.status(201).json({
      leanUser,
      jwt: {
        token,
        expiresIn,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(error);
      return res.status(400).json({
        errors: [
          {
            value: email,
            message: "Email already exists",
          },
        ],
      });
    }
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(403).json({
        errors: [
          {
            message: "Invalid credentials",
          },
        ],
      });
    }

    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        title: user.degree,
        experience: user.experience,
      },
      jwt: {
        token,
        expiresIn,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.userId);
    return res.json({
      jwt: {
        token,
        expiresIn,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({
      message: "Logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
