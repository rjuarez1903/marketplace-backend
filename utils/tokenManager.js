import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const expiresIn = 60 * 15;
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
