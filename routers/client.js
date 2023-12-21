const express = require("express");
const { getProducts } = require("../models/client/userProducts");
const { userLogin, userRegister } = require("../models/client/User");
const checkUserAuth = require("../middleware");
const { addOrder } = require("../models/client/userOrder");
const router = express.Router();

//users
router.post("/register", userRegister);
router.post("/login", userLogin);

//order
router.post("/order/add", checkUserAuth, addOrder);

//product
router.get("/product/view", checkUserAuth, getProducts);

module.exports = router;
