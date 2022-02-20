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
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female']
    },
    address: {
        type: DataTypes.TEXT
    },
    phone: {
        type: DataTypes.INTEGER
    }

}, {
    freezeTableName: true
});

export default Profile;