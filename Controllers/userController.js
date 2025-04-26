const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });
    const { name, email } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ message: "Sign-in successful", user: { name, email } });
  } catch (err) {
    console.error("Google sign-in error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Logout unsuccessfull" });
  }
};

module.exports = {
  signIn,
  logOut,
};
