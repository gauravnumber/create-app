/* eslint-disable no-console */
/* eslint-disable consistent-return */
const Router = require('express')
const Phonebook = require('../models/person')

const router = Router()

router.get('/persons', (request, response) => {
  Phonebook
    .find({})
    .then((persons) => {
      response.json(persons)
    })
})

// localhost:8000/api/info
router.get('/info', (request, response) => {
  Phonebook.find({}).then((result) => {
    const personNumber = result.length
    const date = new Date()
    response.end(`<p>Phonebook has info for ${personNumber} people</p><p>${date}</p>`)
  })
})

router.get('/persons/:id', (request, response, next) => {
  Phonebook
    .findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

router.get('/health', (request, response) => {
  response.send('ok')
})

router.get('/version', (request, response) => {
  response.send('2')
})

router.delete('/persons/:id', (request, response, next) => {
  Phonebook
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

router.post('/persons', (request, response, next) => {
  const { body } = request

  console.log('body', body)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number can\'t be empty',
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save().then((result) => {
    response.json(result)
    console.log(result)
  })
    .catch((error) => next(error))
})

router.put('/persons/:id', (request, response, next) => {
  const { body } = request
  const person = {
    // ...body,
    name: body.name,
    number: body.number,
  }

  Phonebook
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

module.exports = router
