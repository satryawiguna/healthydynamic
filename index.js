import express from "express";
import db from "./config/database.js";

const app = express();

try {
    await db.authenticate();
    console.log("Database connected...");
} catch (error) {
    console.error(error);
}

app.listen(1982, () => console.log("Server is running at port 1982..."));