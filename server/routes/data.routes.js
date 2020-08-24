const router = require("express").Router();
const Product = require("../models/product.model");
const productsController = require("../controllers/products.controller");

router.get("/home", productsController.home);

router.get("/store", productsController.store);

router.get("/store/:category", productsController.storeByCategory);

module.exports = router;
