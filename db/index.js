const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sdc', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

const connection = mongoose.connection

connection.once('open', () => console.log('MongoDB connected successfully\n'))

module.exports = connection
