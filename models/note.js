const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config()

const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const url = process.env.MONGODB_URL_part1 + password + process.env.MONGODB_URL_part2

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Note', noteSchema)