const express = require("express");
const { restaurantsController } = require("../controllers");

const router = express.Router();

router.get("/", restaurantsController.restaurants);
module.exports = router;
