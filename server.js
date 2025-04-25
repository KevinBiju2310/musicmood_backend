require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.error("Error occured in connecting database", err));
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./Routes/userRoutes");

const app = express();
app.use(cookieparser());
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
