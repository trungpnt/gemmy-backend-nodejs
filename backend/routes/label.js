const express = require("express");

const LabelController = require("../controllers/label");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const permit = require("../middleware/authorization");
const router = express.Router();

router.post("", checkAuth , permit('label_write'),  LabelController.createLabel);

router.put("/:id", checkAuth , permit('label_write'), LabelController.updateLabel);

router.get("", checkAuth , permit('label_read'), LabelController.getLabels);

router.get("/:id", checkAuth , permit('label_read'), LabelController.getLabel);

router.delete("/:id", checkAuth , permit('label_write'), LabelController.deleteLabel);

// router.delete("/:id", checkAuth, LabelController.deleteLabel);

module.exports = router;
