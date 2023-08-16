import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import "express-async-errors";

import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/Auth.js";

const app = express();

const port = process.env.PORT || 5000;

app.get("/home", (req, res) => {
  res.send("HomePage");
});

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticateUser, taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`server listening on port... ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
