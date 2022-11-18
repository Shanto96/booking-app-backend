import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const connect = async () => {
  console.log(process.env.MONGO);
  try {
    await mongoose.connect(`${process.env.MONGO}`, {
      useUnifiedTopology: true, // For Mongoose 5 only. Remove for Mongoose 6+
      serverSelectionTimeoutMS: 10000, // Defaults to 30000 (30 seconds)
    });
    console.log("DB connected");
  } catch (error) {
    throw error;
    console.log(error);
    console.log("error from db connection");
  }
};
app.use(
  cors({
    origin: "*",
  })
);
const app = express();

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";

mongoose.connection.on("disconnect", () => console.log("DB disconnected"));

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("connected to backend at http://localhost:8800/");
});
