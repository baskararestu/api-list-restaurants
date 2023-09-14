const express = require("express");
const { commentsController } = require("../controllers");

const router = express.Router();

router.get("/:id_restaurant", commentsController.comments);
module.exports = router;
