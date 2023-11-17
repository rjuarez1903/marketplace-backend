import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Conectado a MongoDB");
} catch (error) {
  console.log(error);
}
