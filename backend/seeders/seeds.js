const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Grief = require("../models/Grief");
const Union = require("../models/Union")
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const NUM_SEED_USERS = 10;
const NUM_SEED_GRIEFS = 30;
const NUM_SEED_UNIONS = 5;
// Create users
const users = [];
users.push(
  new User({
    username: "demo-user",
    email: "demo-user@appacademy.io",
    hashedPassword: bcrypt.hashSync("starwars", 10),
    union: 1, // Add a reference to the union created in your seed file
  })
);
for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      union: 1, // Add a reference to the union created in your seed file
    })
  );
}
// Create griefs
const griefs = [];
for (let i = 0; i < NUM_SEED_GRIEFS; i++) {
  griefs.push(
    new Grief({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    })
  );
}
//Create unions
const unions = [];
for (let i = 0; i < NUM_SEED_UNIONS; i++) {
  unions.push(
    new Union({
      name: faker.company.companyName(),
      unionMember: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      actions: faker.lorem.sentence(),
    })
  );
}
// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users, griefs, and users...");
  User.collection
    .drop()
    .then(() => Grief.collection.drop())
    .then(() => Union.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Grief.insertMany(griefs))
    .then(() => Union.insertMany(unions))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};