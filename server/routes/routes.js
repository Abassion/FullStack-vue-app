const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

const User = require('../database/models/user')

router.post("/api", async (req, res) => {
    const newUser = new User({
      password: req.body.password,
      email: req.body.email,
      username: req.body.username,
    })
    try {
      await newUser.save();
      res.status(201).send();
    } catch(e) {  
      res.status(400).send(e)
    }
});


router.get("/api", async (req, res) => {
  try {
    let users = await loadUsersCollection();
    let usersData = await users.find({}).toArray();
    res.status(200).send(usersData);
  } catch (e) {
    res.status("404").send();
  }
});

router.get("/api/:id", async (req, res) => {
  const { user, users } = await findUser(req.params.id);
  if (!user) {
    res.send("USER NOT FOUND");
    return;
  }
  res.status(200).send(user);
});

router.delete("/api/:id", async (req, res) => {
  const _id = req.params.id;
  const { user, users } = await findUser(_id);
  if (!user) {
    res.send("USER NOT FOUND");
    return;
  }
  try {
    users.deleteOne(user);
    res.status(200).send();
  } catch (e) {
    res.status("404").send();
  }
});

router.patch("/api", async (req, res) => {
  const _id = req.body._id;
  const { user, users } = await findUser(_id);
  if (!user) {
    res.send("USER NOT FOUND");
    return
  }
  const updateObj = {};
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== "_id") updateObj[key] = value;
  }
  try {
    await users.findOneAndUpdate(
       user,
      { $set: updateObj }
    );
    res.status(200).send();
  } catch (e) {
    res.status("404").send();
  }
});

const loadUsersCollection = async () => {
  const client = await mongoose.connect(
    "mongodb://127.0.0.1:27017/full-stack",
    {
      useNewUrlParser: true
    }
  );
  return mongoose.connection.collection("users");
};

const findUser = async _id => {
  const users = await loadUsersCollection();
  const user = await users.findOne({_id : new ObjectId(_id)});
  return { user, users };
};

module.exports = router;
