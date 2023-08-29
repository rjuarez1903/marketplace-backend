import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Content should be at least 5 characters"],
    maxlength: [255, "Content should not exceed 255 characters"],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  isBlocked: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("comment", commentSchema);