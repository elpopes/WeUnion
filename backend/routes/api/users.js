const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
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
  //   console.log("++++++++++++++++++++++++++++++++++++++++++");
  //   console.log(req.user);
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl, // <- ADD THIS LINE
    email: req.user.email,
    unions: req.user.unions,
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
      unions: req.body.unionName,
    });

    //code for adding new user to union.
    //refactor later
    const unionId = req.body.unionName;
    const userId = newUser._id;

    Union.findOneAndUpdate(
      { _id: unionId },
      { $push: { members: userId } },
      { new: true }
    )
      .then((updatedUnion) => {
        if (!updatedUnion) {
          //// console.log("NOT FOUND");
        } else {
          //// console.log(`Added user ${userId} to union ${updatedUnion.name}`);
        }
      })
      .catch((error) => {
        // handle the error
      });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
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

router.patch("/:id", singleMulterUpload("image"), async (req, res) => {
  const userId = req.params.id;
  //   const body = req.body;
  //   const image = req.body.image; // change this to req.file

  try {
    // upload the image
    const path = await singleFileUpload({ file: req.file, public: true });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // update the image property with the new path
    //   .image = path;
    let profileImageUrl = path;
    // Object.assign(user, profileImageUrl);
    user.profileImageUrl = profileImageUrl;
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
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

router.post(
  "/user/:userId/moveUnionToFront/:unionId",
  requireUser,
  async (req, res) => {
    try {
      const { userId, unionId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const unionIndex = user.unions.indexOf(unionId);

      if (unionIndex === -1) {
        return res
          .status(400)
          .json({ error: "Union not found in user unions" });
      }

      user.unions.splice(unionIndex, 1);
      user.unions.unshift(unionId);
      await user.save();

      res.json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  }
);

module.exports = router;
