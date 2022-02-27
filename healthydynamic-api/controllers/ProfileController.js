import Profile from "../models/ProfileModel.js";
import User from "../models/UserModel.js";

export const getMeProfile = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        email: req.email,
      },
      attributes: ["id"],
    });

    const profile = await Profile.findAll({
      where: {
        userId: users[0].id,
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
  }
};

export const modifyMeProfile = async (req, res) => {
  const { full_name, nick_name, gender, address, phone } = req.body;

  try {
    const users = await User.findAll({
      where: {
        email: req.email,
      },
    });

    const profile = await Profile.update(
      {
        full_name: full_name,
        nick_name: nick_name,
        gender: gender,
        address: address,
        phone: phone,
      },
      {
        where: {
          userId: users[0].id,
        },
      }
    );

    res.status(200).json({
      message: "Profile updated",
      data: profile,
    });
  } catch (error) {
    console.error(error);
  }
};
