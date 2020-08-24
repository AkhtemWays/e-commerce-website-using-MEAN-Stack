const { Types, Schema, model } = require("mongoose");
const productSchema = require("./product.model");

const userSchema = new Schema({
  orders: [
    {
      type: Types.ObjectId,
      order: [{ type: Types.ObjectId, ref: "products" }],
    },
  ],
  address: {
    country: String,
    city: String,
    street: String,
    house: String,
    zipcode: String,
    flat: Number,
  },
  username: String,
  password: String,
  cart: [{ ref: "products" }],
});

module.exports = model("users", userSchema);
