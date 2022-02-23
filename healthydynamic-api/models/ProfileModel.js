import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Profile = db.define('profiles', {
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nick_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        allowNull: true
            // defaultValue: 'male'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    freezeTableName: true
});

export default Profile;