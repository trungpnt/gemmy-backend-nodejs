const express = require("express");

const LabelController = require("../controllers/label");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const router = express.Router();

router.post("",  LabelController.createLabel);

router.put("/:id", LabelController.updateLabel);

router.get("", LabelController.getLabels);

router.get("/:id", LabelController.getLabel);

router.delete("/:id", LabelController.deleteLabel);

// router.delete("/:id", checkAuth, LabelController.deleteLabel);

module.exports = router;
