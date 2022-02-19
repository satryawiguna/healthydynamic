import { Sequelize } from "sequelize"

const db = new Sequelize("healthydynamic", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }
});

export default db;