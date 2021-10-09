const express = require("express");
const router = express.Router();

// Controllers
const RootController = require("../controllers/rootController");
const rootController = new RootController();

// Root
router.get("/", rootController.getInformation);

module.exports = router;
