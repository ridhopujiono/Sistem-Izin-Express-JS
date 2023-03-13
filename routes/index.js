const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController.js");
const adminController = require("../controllers/adminController.js");

router.get("/", function (req, res) {
  homeController.index(req, res);
});
router.post("/permit", function (req, res) {
  homeController.store(req, res);
});
router.get("/auth", function (req, res) {
  adminController.login(req, res);
});
router.post("/auth", function (req, res) {
  adminController.authenticate(req, res);
});
router.get("/dashboard", adminController.isAdmin, adminController.dashboard);
router.post(
  "/dashboard/getbydate",
  adminController.isAdmin,
  adminController.getByDate
);

module.exports = router;
