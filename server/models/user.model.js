const { Types, Schema, model } = require("mongoose");

const userSchema = new Schema({
  //   orders: [
  //     {
  //       type: Types.ObjectId,
  //       order: [{ type: Types.ObjectId, ref: "products" }],
  //     },
  //   ],
  address: {
    country: String,
    city: String,
    street: String,
    house: String,
    zipcode: String,
    flat: String,
  },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cart: Types.Array({ ref: "products", type: Types.ObjectId }),
});

module.exports = model("users", userSchema);
