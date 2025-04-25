const Mood = require("../Models/moodSchema");

const newMood = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood } = req.body;

    const newMood = new Mood({
      userId: userId,
      mood,
    });
    const savedMood = await newMood.save();
    res
      .status(201)
      .json({ message: "Mood added successfully", mood: savedMood });
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDateRange = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required" });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    console.log(startDate, endDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const moods = await Mood.find({
      userId: userId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: 1 });
    // console.log(moods, "moods");
    res.status(200).json({ message: "Moods fetched with given dates", moods });
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDayMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, moods } = req.body;

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    await Mood.deleteMany({
      userId: userId,
      date: { $gte: dayStart, $lte: dayEnd },
    });

    const moodPromises = moods.map((mood) => {
      const newMood = new Mood({
        userId: req.userId,
        mood,
        date: new Date(),
      });
      return newMood.save();
    });

    const savedMoods = await Promise.all(moodPromises);
    res.status(200).json({ message: "Mood updated successfully", savedMoods });
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTodayMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const moods = await Mood.find({
      userId: userId,
      date: { $gte: today },
    }).sort({ date: 1 });
    res
      .status(200)
      .json({ message: "Retrieved today moods successfully", moods });
  } catch (err) {
    console.error("Error occured", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWeeklyMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const moods = await Mood.find({
      userId: userId,
      date: { $gte: startOfWeek },
    }).sort({ date: 1 });
    res
      .status(200)
      .json({ message: "Retrieved Weekly moods successfully", moods });
  } catch (err) {
    console.error("Error occured", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const { moodIds } = req.body;
    const moods = await Mood.find({
      _id: { $in: moodIds },
      userId: userId,
    });
    if (moods.length !== moodIds.length) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete some of these moods" });
    }
    await Mood.deleteMany({ _id: { $in: moodIds } });
    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (err) {
    console.error("Error occured", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  newMood,
  getDateRange,
  updateDayMoods,
  getTodayMoods,
  getWeeklyMoods,
  deleteMoods,
};
