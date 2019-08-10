const mongoose = require('mongoose')


const daySchema = mongoose.Schema({
  day: Number
});

const Day = mongoose.model("Day", daySchema)

module.exports = Day