const mongoose = require('mongoose')

const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
          console.log('connected to MongoDB')
        })
  .catch((error) => {
          console.log('error connecting to MongoDB:', error.message)
        })

 const issueSchema = new mongoose.Schema({
       date: Date,
       desc: String,
       dev:  String,
       prior: String,
 })


 issueSchema.set('toJSON', {
      transform: (document, returnedObject) => {
              returnedObject.id = returnedObject._id.toString()
              delete returnedObject._id
              delete returnedObject.__v
            }
})

module.exports = mongoose.model('Issue', issueSchema)
