import "dotenv/config";
import "./database/connectDb.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import serviceRouter from "./routes/service.route.js";
import serviceContractService from "./routes/serviceContract.route.js";
import commentRouter from "./routes/comment.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/serviceContracts", serviceContractService);
app.use("/api/v1/comments", commentRouter); 


const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is listening on port 4000 http://localhost:${PORT}`);
});
