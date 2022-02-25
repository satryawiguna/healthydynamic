import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",

    // ### ENABLE IT IF USE MAMP PRO ###
    dialectOptions: {
      socketPath: process.env.DB_SOCKET,
    },
  }
);

export default db;
