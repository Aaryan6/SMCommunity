import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json({ success: true, data: others });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) res.status(404).json("User doesn't exists.");

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      isUser.password
    );
    if (!passwordMatch)
      res.status(500).json({ success: false, message: "Something went wrong" });

    const { password, ...others } = isUser._doc;
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_KEY);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, data: others });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
