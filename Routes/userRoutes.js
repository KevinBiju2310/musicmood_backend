const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const userController = require("../Controllers/userController");
const moodController = require("../Controllers/moodController");

router.post("/signin", userController.signIn);
router.post("/logout", userController.logOut);

router.post("/add", authMiddleware, moodController.newMood);
router.put("/day", authMiddleware, moodController.updateDayMoods);

router.get("/today", authMiddleware, moodController.getTodayMoods);
router.get("/range", authMiddleware, moodController.getDateRange);

router.delete("/delete", authMiddleware, moodController.deleteMoods);

module.exports = router;
