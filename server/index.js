import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute.js";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Roshan",
  });
});
app.use("/api/user", UserRoute);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const mesg = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    mesg,
  });
});

const connectDb = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => console.log("Connected to Database"))
    .catch((err) => console.log(err));
};
const startServ = async () => {
  try {
    connectDb();
    app.listen(8080, () => console.log("Server is running at port 8080"));
  } catch (err) {
    console.log(err);
  }
};

startServ();
