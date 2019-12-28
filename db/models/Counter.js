const mongoose = require('mongoose')

const schema = mongoose.Schema({
  id: String,
  count: Number
})

const Count = mongoose.model('Count', schema)

module.exports = Count
