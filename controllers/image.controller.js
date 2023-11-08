import upload from "../services/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const imageUrl = await upload(req.file.buffer);
    return res.json({ imageUrl });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};