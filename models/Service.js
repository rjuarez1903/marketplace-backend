import mongoose from "mongoose";
import { Comment } from "./Comment.js";
import { ServiceContract } from "./ServiceContract.js";

const serviceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    maxLength: [50, "El nombre no puede exceder los 50 caracteres"],
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [255, "La descripción no puede exceder los 255 caracteres"],
    required: true,
  },
  category: {
    type: String,
    enum: ["programacion", "idiomas", "musica", "matematica"],
    required: true,
  },
  frequency: {
    type: String,
    enum: ["unique", "weekly", "monthly"],
    required: true,
  },
  cost: {
    type: Number,
    min: [0.99, "El costo mínimo es de $0.99 "],
    required: true,
  },
  type: {
    type: String,
    enum: ["individual", "group"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: [0.5, "La duración mínima es de 30 minutos"],
    max: [4, "La duración máxima es de 4 horas"],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  sumOfRatings: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

serviceSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const serviceId = this._id;
  await Comment.deleteMany({ serviceId });
  await ServiceContract.deleteMany({ serviceId });
  next();
});

export const Service = mongoose.model("service", serviceSchema);
