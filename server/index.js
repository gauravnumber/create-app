/* eslint-disable no-console */
/* eslint-disable consistent-return */
require('dotenv').config()
// eslint-disable-next-line import/order
// const Phonebook = require('./models/person')

// const mongoose = require('mongoose')
const morgan = require('morgan')
const express = require('express')
const routes = require('@util/routes')
const errorMiddleware = require('@middleware/errorMiddleware')

const app = express()
app.use(express.json())

app.use(routes)

// const cors = require('cors')

// const { PORT } = process.env

// app.use(cors())

morgan.token('type', (request) => {
  const body = JSON.stringify(request.body)
  return body
})

// app.use(express.static('build'))
// app.use(express.json())
app.use(errorMiddleware)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

// app.get('/', (request, response) => {
//   response.end('Homepage')
// })

// app.get('/api/persons', (request, response) => {
//   Phonebook
//     .find({})
//     .then((persons) => {
//       response.json(persons)
//     })
// })

// app.get('/info', (request, response) => {
//   Phonebook.find({}).then((result) => {
//     const personNumber = result.length
//     const date = new Date()
//     response.end(`<p>Phonebook has info for ${personNumber} people</p><p>${date}</p>`)
//   })
//   // console.log('personNumber', personNumber);
// })

// app.get('/api/persons/:id', (request, response, next) => {
//   Phonebook
//     .findById(request.params.id)
//     .then((result) => {
//       response.json(result)
//     })
//     .catch((error) => next(error))
// })
// app.delete('/api/persons/:id', (request, response, next) => {
//   Phonebook
//     .findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
//   // .catch(error => {
//   //   console.log(error.name);
//   //   response.status(204).end()
//   // })
// })

// app.post('/api/persons', (request, response, next) => {
//   const { body } = request

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'Name or number can\'t be empty',
//     })
//   }

//   const person = new Phonebook({
//     name: body.name,
//     number: body.number,
//   })

//   // let error = Phonebook.validateSync()
//   // assert.equal(error.errors['eggs'].message,
//   // 'Too few eggs');
//   // console.log('typeof err', typeof err)
//   // console.log('error', error);

//   person.save().then((result) => {
//     response.json(result)
//     console.log(result)
//   })
//     .catch((error) => next(error))
//   // .catch(error => {

//   //   console.log(error);
//   //   // response.status(400).end()
//   //   // response.status(400).json({ error: 'id not match'})
//   // })
// })

// app.put('/api/persons/:id', (request, response, next) => {
//   const { body } = request
//   const person = {
//     // ...body,
//     name: body.name,
//     number: body.number,
//   }

//   Phonebook
//     .findByIdAndUpdate(request.params.id, person, { new: true })
//     .then((result) => {
//       response.json(result)
//     })
//     .catch((error) => next(error))
// })

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// // this has to be the last loaded middleware.
// app.use(errorHandler)

module.exports = app
// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`)
// })
