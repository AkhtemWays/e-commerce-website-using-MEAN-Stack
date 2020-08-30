const express = require("express");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const initialData = require("./initialData");
const Product = require("./models/product.model");
const bodyParser = require("body-parser");

// constants
const PORT = config.port || 5000;
const mongouri = config.mongouri;
// middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
//routes
app.use("/api", require("./routes/data.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
const start = async (req, res) => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Listening to the port ${PORT}...`));
    for (let product of initialData) {
      const newProduct = await new Product(product);
      await newProduct.save();
    }
  } catch (e) {
    console.log("Server error ", e.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

start();
