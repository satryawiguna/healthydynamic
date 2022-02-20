import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Profile from './ProfileModel.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

User.hasOne(Profile, {
    onDelete: "cascade"
});

Profile.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});

export default User;