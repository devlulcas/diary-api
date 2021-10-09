const express = require("express");
const router = express.Router();

// Controllers
const ConfigController = require("../controllers/configController");
const configController = new ConfigController();

// Config
router.get("/", configController.getConfig);
router.put("/", configController.updateConfig);

module.exports = router;
