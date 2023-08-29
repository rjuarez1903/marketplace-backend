import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
      throw new Error("No token provided");
    }
    const { userId } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
