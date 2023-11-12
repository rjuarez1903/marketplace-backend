import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const expiresIn = 60 * 60 * 24 * 7; // Modificar el tiempo de expiración
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (userId, res) => {
  const expiresIn = 60 * 60 * 24 * 7;
  try {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === "dev"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, userId: decoded.userId };
  } catch (error) {
    console.log("Error al verificar el token:", error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      return { valid: false, error: "Invalid token" };
    } else if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: "Token expired" };
    } else {
      return { valid: false, error: "Token verification failed" };
    }
  }
};