import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    maxLength: [50, "Title cannot be more than 50 characters"],
    trim: true,
  },
  experience: {
    type: String,
    maxLength: [255, "Experience cannot be more than 50 characters"],
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("user", userSchema);
