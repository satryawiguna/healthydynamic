import express from "express";
import db from "./config/database.js";
import User from "./models/UserModel.js";
import Profile from "./models/ProfileModel.js";

const app = express();

try {
    await db.authenticate();
    console.log("Database connected...");

    await User.sync();
    await Profile.sync();
} catch (error) {
    console.error(error);
}

app.listen(1982, () => console.log("Server is running at port 1982..."));