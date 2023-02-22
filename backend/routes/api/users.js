const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png"; // <- Insert the S3 URL that you copied above here

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate("username", "union")
      .sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl, // <- ADD THIS LINE
    email: req.user.email,
  });
});

router.post(
  "/register",
  singleMulterUpload("image"),
  validateRegisterInput,
  async (req, res, next) => {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user) {
      // Throw a 400 error if the email address or username already exists
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      if (user.email === req.body.email) {
        errors.email = "A user has already registered with this email";
      }
      if (user.username === req.body.username) {
        errors.username = "A user has already registered with this username";
      }
      err.errors = errors;
      return next(err);
    }

    const profileImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : DEFAULT_PROFILE_IMAGE_URL;

    const newUser = new User({
      username: req.body.username,
      profileImageUrl,
      email: req.body.email,
      union: req.body.unionName,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          // return res.json({ user });
          return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
        } catch (err) {
          next(err);
        }
      });
    });
  }
);

router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// Define a PATCH route to update a user

router.patch("/:id", singleMulterUpload("image"), async (req, res) => {
  const userId = req.params.id;
  const update = req.body;
  try {
    const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    Object.assign(user, update);
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// deletes a user

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json(user);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// get specific user************JUST INCASE WE NEED IT

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
