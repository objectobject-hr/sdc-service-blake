const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/amenities-overview', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const connection = mongoose.connection

connection.once('open', () => console.log('MongoDB connected successfully'))
