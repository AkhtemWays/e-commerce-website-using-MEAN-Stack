const express = require("express");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");

// constants
const PORT = config.port || 5000;
const mongouri = config.mongouri;
// middleware
const app = express();
app.use(cors());

const start = async (req, res) => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Listening to the port ${PORT}...`));
  } catch (e) {
    res.status(500).json({
      message: "Server error",
    });
    console.log("Server error ", e.message);
  }
};

start();
