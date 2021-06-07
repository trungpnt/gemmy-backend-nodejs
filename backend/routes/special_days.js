const express = require("express");

const SpecialDaysController = require("../controllers/special_days");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, SpecialDaysController.createSpecialDays);

router.put("/:id", checkAuth,SpecialDaysController.updateSpecialDays);

router.get("", SpecialDaysController.getSpecialDays);

router.get("/:id", SpecialDaysController.getSpecialDays);

router.delete("/:id", checkAuth, SpecialDaysController.deleteSpecialDays);

module.exports = router;
