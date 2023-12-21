const express = require("express");
const { adminRegister, adminLogin } = require("../models/dashborad/Admin");
const {
  viewOrders,
  changeStatus,
  addOrder,
} = require("../models/dashborad/adminOrder");
const checkAdminAuth = require("../middleware");
const {
  viewProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../models/dashborad/adminProduct.js");

const router = express.Router();

//admin
router.post("/register", adminRegister);
router.post("/login", adminLogin);

//order
router.post("/order/add", checkAdminAuth, addOrder);
router.get("/order/view", checkAdminAuth, viewOrders);
router.put("/order/changeStatus/:id", checkAdminAuth, changeStatus);

//product
router.get("/product/view", checkAdminAuth, viewProducts);
router.post("/product/add", checkAdminAuth, addProduct);
router.put("/product/update/:id", checkAdminAuth, updateProduct);
router.delete("/product/delete/:id", checkAdminAuth, deleteProduct);

module.exports = router;
