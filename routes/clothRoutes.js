const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileUpload = require("../utils/multerProfile");

const {
  addCloth,
  getAllCloth,
  deleteCloth,
  updateCloth,
} = require("../controller/clothController");

router.post("/addcloth", profileUpload.single("avatar"), addCloth);
router.get("/getallcloth", getAllCloth);
router.get("/delete/:id", deleteCloth);
router.post("/update/:id", updateCloth);

module.exports = router;
