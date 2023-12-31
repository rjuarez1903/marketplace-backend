import "dotenv/config";
import "./database/connectDb.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import serviceRouter from "./routes/service.route.js";
import serviceContractService from "./routes/serviceContract.route.js";
import commentRouter from "./routes/comment.route.js";
import imageRouter from "./routes/image.route.js"

const app = express();

const whitelist = [process.env.ORIGIN1];

app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        return callback(null, true);
      }
      return callback("Not allowed by CORS");
    },
    credentials: true, 
  })
);
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/serviceContracts", serviceContractService);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/uploads", imageRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} http://localhost:${PORT}`);
});
