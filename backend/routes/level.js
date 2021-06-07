const express = require("express");

const LevelController = require("../controllers/level");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, LevelController.createLevel);

router.put("/:id", checkAuth, extractFile, LevelController.updateLevel);

router.get("", LevelController.getLevels);

router.get("/:id", LevelController.getLevel);

router.delete("/:id", checkAuth, LevelController.deleteLevel);

module.exports = router;
