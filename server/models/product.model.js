const { Types, model, Schema } = require("mongoose");

const productSchema = new Schema({
  price: Number,
  availability: Boolean,
  category: String,
  name: String,
  description: String,
  brand: String,
  date_published: Date,
  image: String,
  clicks: Number,
  bestseller: Boolean,
  discount: Number,
  shipping_fee: Number,
  sold: Number,
});

module.exports = model("products", productSchema);
