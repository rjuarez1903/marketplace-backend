import mongoose from "mongoose";

const ServiceContractSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: [255, "Message cannot be more than 255 characters"],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  preferredContactTime: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
  contractStatus: {
    type: String,
    enum: ["requested", "completed", "accepted", "cancelled"],
    default: "requested",
  },
});

export const ServiceContract = mongoose.model(
  "serviceContract",
  ServiceContractSchema
);
