const mongoose = require('mongoose')
const moment = require('moment')

const schema = mongoose.Schema({
  listing_ID: { type: Number, index: true },
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

const methods = ['findOne', 'create', 'updateOne', 'deleteOne', 'save']

for (const method of methods) {
  schema.pre(method, () => {
    this.start = moment()
  })
  schema.post(method, () => {
    this.end = moment()
    console.log(
      method + ': ' + this.end.diff(this.start, 'milliseconds') + 'ms\n'
    )
  })
}

const Detail = mongoose.model('Detail', schema)

module.exports = Detail
