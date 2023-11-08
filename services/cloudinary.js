import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (imageBuffer) => {
  const uploadResult = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error.message);
        }
        resolve(result.secure_url);
      })
      .end(imageBuffer);
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return uploadResult;
};

export default upload;
