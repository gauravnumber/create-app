const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.23qc1.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)
const name = process.argv[3]
const number = process.argv[4]

const phonebook = new Phonebook({
  name,
  number,
})

if (process.argv.length === 5) {

  phonebook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  Phonebook
    .find({})
    .then(result => {
      console.log('phonebook:')

      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

} else {
  console.log('Please provide correct your command')
  process.exit(1)
}
