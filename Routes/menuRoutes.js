const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

// get method to get menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

// post method to set menu

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "Sweet" || tasteType == "Sour" || tasteType == "Spicy") {
      const response =await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid taste type",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});


module.exports = router;
