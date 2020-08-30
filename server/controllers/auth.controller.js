const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.signup = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({
      username: req.body.username,
      password: password,
      address: {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        house: req.body.house,
        zipcode: req.body.zipcode,
        flat: req.body.flat,
      },
      cart: [],
    });
    await newUser.save();
    res.status(201).json({
      message: "successfully added a user",
    });
  } catch (e) {
    console.log(`Server error at api/auth/signup route ${e.message}`);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const candidate = await User.findOne({ username: req.body.username });
    if (!candidate) {
      return res.status(400).json({
        message: "Such user does not exist",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }
    const token = await jwt.sign({ userId: candidate.id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    return res.status(201).json({
      message: "success",
      token: token,
      currentUser: candidate,
    });
  } catch (e) {
    console.log(`Server error at /api/auth/login route, ${e.message}`);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
