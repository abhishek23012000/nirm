const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let multer = require("multer");
//Models
const Cloth = require("../models/cloth");

//Config
const keys = require("../config/key");

module.exports = {
  addCloth: async (req, res, next) => {
    try {
      const avatar = req.file.filename;
      const { clothName, description, price } = req.body;

      if (!clothName || !avatar || !description || !price) {
        return res.status(400).json({
          success: false,
          message: "Probably you have missed certain fields",
        });
      }
      const profile_url = `http://localhost:5000/avatar/${req.file.filename}`;
      const newCloth = await new Cloth({
        description,
        price,
        clothName,
        avatar: profile_url,
      });
      await newCloth.save();
      return res.status(200).json({
        success: true,
        message: " added successfully",
        response: newCloth,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getAllCloth: async (req, res, next) => {
    try {
      const cloths = await Cloth.find({});
      if (cloths.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: cloths });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting cloth", ${err.message}` });
    }
  },

  deleteCloth: async (req, res, next) => {
    try {
      let cloth = await Cloth.findById(req.params.id);
      cloth.remove();

      res.status(200).json({
        success: true,
        message: "deleted sucessfully",
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in deleting cloth", ${err.message}` });
    }
  },

  updateCloth: async (req, res, next) => {
    try {
      let cloth = await Cloth.findById(req.params.id);
      const { description, price } = req.body;
      if (price) {
        cloth.price = price;
        await cloth.save();
      }
      if (description) {
        cloth.description = description;
        await cloth.save();
      }

      res.status(200).json(cloth);
    } catch (err) {
      console.log("Error in updating cloth deatils", err.message);
    }
  },
};
