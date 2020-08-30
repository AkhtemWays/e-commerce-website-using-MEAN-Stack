const Product = require("../models/product.model");

exports.home = async (req, res) => {
  try {
    const products = await Product.find({ bestseller: true });
    return res.status(200).json({
      products: products,
    });
  } catch (e) {
    console.log(`Server error in home route, ${e.message}`);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
exports.product = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.body.id });
    if (product) {
      return res.status(200).json({
        product: product,
      });
    } else {
      res.status(500).json({
        message: "Server error",
      });
    }
  } catch (e) {
    console.log(`Server error at api/product route, ${e.message}`);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.store = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    return res.status(200).json({
      categories: categories,
    });
  } catch (e) {
    console.log(`Server error in store route, ${e.message}`);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.storeByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (products.length) {
      return res.status(200).json({
        products: products,
      });
    } else {
      return res.status(400).json({
        message: "No such category",
      });
    }
  } catch (e) {
    console.log(`Server error in store/category route, ${e.message}`);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
