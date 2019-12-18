const mongoose = require('mongoose')

const DetailSchema = mongoose.Schema({
  listing_ID: Number,
  propertyType: String,
  overview: {
    Sleeps: {
      icon: String,
      data: Number
    },
    Bedrooms: {
      icon: String,
      data: Number
    },
    Bathrooms: {
      icon: String,
      data: Number
    },
    'Half Baths': {
      icon: String,
      data: Number
    },
    'Min Stay': {
      icon: String,
      data: String
    }
  },
  amenities: {
    Featured: [Object],
    'Safety Features': [String],
    'Location Type': [String],
    General: [String],
    Kitchen: [String],
    Dining: [String],
    Entertainment: [String],
    Outside: [String],
    'Pool/Spa': [String]
  },
  houseRules: {
    rules: [String],
    minAge: Number
  },
  tags: [String]
})

const Detail = mongoose.model('Detail', DetailSchema)

module.exports = { Detail }
