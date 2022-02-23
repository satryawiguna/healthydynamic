import User from "../models/UserModel.js";
import Profile from "../models/ProfileModel.js";
import bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';
import jwt from "jsonwebtoken";

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

export const login = async(req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            },
            include: [Profile]
        })

        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) return res.status(400).json({ message: "Password invalid" });

        const id = user[0].id;
        const email = user[0].email;
        const full_name = user[0].profile.full_name;
        const nick_name = user[0].profile.nick_name;

        const accessToken = jwt.sign({ id, email, full_name, nick_name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign({ id, email, full_name, nick_name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await User.update({
            refresh_token: refreshToken,
        }, {
            where: {
                id: id
            }
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Email not found"
        });
    }
};

export const isAuth = async(req, res) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'refresh_token']
            },
            include: [Profile]
        })

        res.json(users);
    } catch (error) {
        console.error(error);
    }
};

export const getUser = async(req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password', 'refresh_token']
            },
            include: [Profile]
        });

        if (user === null) {
            console.error('User not found');
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
    }
}

export const storeUser = async(req, res) => {
    const { email, password, password_confirmation, full_name, nick_name, gender, address, phone } = req.body;

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
                nick_name: nick_name,
                gender: gender,
                address: address,
                phone: phone
            }
        }, {
            include: [Profile]
        });

        res.json({
            message: "User creted",
            data: user
        });
    } catch (error) {
        console.error(error)
    }
}

export const modifyUser = async(req, res) => {
    const id = req.params.id;

    const { password, password_confirmation, full_name, nick_name, gender, address, phone } = req.body;

    try {
        const data = {};

        if (typeof password !== "undefined" && password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            if (password !== password_confirmation) return res.status(400).json({ message: "Password & confirm password doesn't match" });

            const user = await User.update({
                password: hashPassword
            }, {
                where: {
                    id: id
                }
            });

            data = user;
        };

        if (full_name == "") return res.status(400).json({ message: "Full name could not be empty" });
        if (nick_name == "") return res.status(400).json({ message: "Nick name could not be empty" });

        const profile = await Profile.update({
            full_name: full_name,
            nick_name: nick_name,
            gender: gender,
            address: address,
            phone: phone
        }, {
            where: {
                userId: id
            }
        });

        data.profile = profile;

        res.json({
            message: "User updated",
            data: data
        });
    } catch (error) {
        console.error(error);
    }
}

export const destroyUser = async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.destroy({
            where: {
                id: id
            }
        });

        res.json({
            message: "User deleted",
            data: user
        })
    } catch (error) {
        console.error(error);
    }
}