const express = require("express");

const SpecialDaysController = require("../controllers/special_days");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", SpecialDaysController.createSpecialDays);

router.put("/:id",SpecialDaysController.updateSpecialDays);

router.get("", SpecialDaysController.getSpecialDays);

router.get("/:id", SpecialDaysController.getSpecialDays);

router.delete("/:id", SpecialDaysController.deleteSpecialDays);

module.exports = router;
