const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Grief = require("../models/Grief");

const DEFAULT_PROFILE_IMAGE_URL =
  "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png"; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

// Initialize image fields in db
const initializeImages = async () => {
  // console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  // console.log("Initializing Grief image URLs...");
  await Grief.updateMany({}, { imageUrls: [] });

  // console.log("Done!");
  mongoose.disconnect();
};
