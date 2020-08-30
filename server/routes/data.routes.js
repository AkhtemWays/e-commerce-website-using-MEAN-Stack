const router = require("express").Router();
const productsController = require("../controllers/products.controller");

router.get("/home", productsController.home);

router.get("/store", productsController.store);

router.get("/store/:category", productsController.storeByCategory);

router.post("/product", productsController.product);
module.exports = router;
