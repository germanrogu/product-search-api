const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/api/items", itemsController.searchItems);
router.get("/api/items/:id", itemsController.getItemDetails);

module.exports = router;
