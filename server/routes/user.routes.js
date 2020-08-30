const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const config = require("../config");

router.get("/authenticate", auth, async (req, res) => {
  if (!req.user) {
    res.status(401).send();
  } else {
    const user = await User.findOne({ _id: req.user.userId });
    const token = await jwt.sign(
      { userId: req.user.userId },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token: token,
      currentUser: user,
    });
  }
});

router.post("/addtocart", auth, async (req, res) => {
  try {
    const product = req.body.product;
    User.findOne({ _id: req.user.userId }, function (err, user) {
      if (err) {
        res.status(500).send();
      } else {
        if (!user) {
          res.status(422).send();
        } else {
          user.cart.push(product);
          user.save(function (err, updatedUser) {
            if (err) {
              res.status(500).send();
            } else {
              res.status(201).json({
                currentUser: updatedUser,
              });
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(`Server error at api/user/addtocart route, ${e.message}`);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/remove-cart-product", auth, async (req, res) => {
  try {
    User.findOne({ _id: req.user.userId }, function (err, user) {
      if (err) {
        res.status(500).send();
      } else {
        if (!user) {
          res.status(404).send();
        } else {
          user.cart = user.cart.filter(
            (product) => product._id !== req.body.product._id
          );
          user.save(function (err, updatedUser) {
            if (err) {
              res.status(500).send();
            } else {
              res.status(201).json({
                currentUser: updatedUser,
              });
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(
      `Server error at api/user/remove-cart-product route, ${e.message}`
    );
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
