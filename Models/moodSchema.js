const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    name: {
      type: String,
      enum: [
        "Happy",
        "Calm",
        "Energetic",
        "Sad",
        "Anxious",
        "Focused",
        "Tired",
      ],
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      enum: [
        "circle",
        "square",
        "triangle",
        "tear",
        "diamond",
        "hexagon",
        "cloud",
      ],
      required: true,
    },
  },
});

const moodModel = mongoose.model("mood", moodSchema);
module.exports = moodModel;
