import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import Profile from "../models/ProfileModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
      include: [Profile],
    });

    if (!user[0]) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const id = user[0].id;
        const email = user[0].email;
        const full_name = user[0].profile.full_name;
        const nick_name = user[0].profile.nick_name;

        const accessToken = jwt.sign(
          { id, email, full_name, nick_name },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
