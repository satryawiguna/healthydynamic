import express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import User from "./models/UserModel.js";
import Profile from "./models/ProfileModel.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");

  await User.sync();
  await Profile.sync();
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.options(
  "*",
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 8669, () =>
  console.log("Server is running at port " + process.env.PORT + "...")
);
