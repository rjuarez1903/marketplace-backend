import { upload } from "../services/cloudinary.js";
import { sendMail } from "../services/sendGrid.js";

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

export const send = async (req, res) => {
  try {
    const { email, subject, text, html } = req.body;
    await sendMail(email, subject, text, html);
    return res.json({ message: "Email sent" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
