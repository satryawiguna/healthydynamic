import User from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";
import bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.error(error);
    }
};

export const register = async(req, res) => {
    const { email, password, password_confirmation, full_name, nick_name } = req.body;

    if (password !== password_confirmation) return res.status(400).json({ message: "Password & confirm password doesn't match" });
    if (!EmailValidator.validate(email)) return res.status(400).json({ message: "Email format invalid" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({
            email: email,
            password: hashPassword,
            profile: {
                full_name: full_name,
                nick_name: nick_name
            }
        }, {
            include: [Profile]
        });

        res.json({
            message: "Register success",
            data: user
        });

    } catch (error) {
        console.error(error);
    }

};