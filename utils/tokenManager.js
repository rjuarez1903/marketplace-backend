import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const expiresIn = 60 * 60 * 24 * 7; 
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
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
      return { valid: false, error: "Token inválido" };
    } else if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: "Token expirado" };
    } else {
      return { valid: false, error: "Falló la verificación del token" };
    }
  }
};