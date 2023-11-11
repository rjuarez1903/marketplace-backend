import {
  createUserService,
  authenticateUserService,
  findUserByEmailService,
  comparePasswordService,
  clearRefreshTokenService,
} from "../services/auth.service.js";
import { generateToken } from "../utils/tokenManager.js";
import { sendPasswordResetEmail } from "../services/sendGrid.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const leanUser = await createUserService({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      degree: "",
      experience: "",
    });
    const { token, expiresIn } = await authenticateUserService(
      leanUser._id,
      res
    );
    return res.status(201).json({
      user: leanUser,
      jwt: {
        token,
        expiresIn,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
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
  const { email, password } = req.body;
  try {
    const user = await findUserByEmailService(email);
    if (!user || !(await comparePasswordService(user, password))) {
      return res.status(403).json({
        errors: [
          {
            message: "Invalid credentials",
          },
        ],
      });
    }
    const { token, expiresIn } = await authenticateUserService(user._id, res);
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
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    clearRefreshTokenService(res);
    return res.json({
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await findUserByEmailService(email);
    if (user) {
      await sendPasswordResetEmail(user);
    }
    return res.json({
      message: "If an account with this email exists, a password reset link has been sent.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const { userId } = generateToken(token);
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.password = password;
    await user.save();
    return res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}