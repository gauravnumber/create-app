/* eslint-disable no-console */
/* eslint-disable consistent-return */
const Router = require('express')
// const messages = require('@controllers/messagesController')
const Phonebook = require('../models/person')

const router = Router()

// router.get('/messages', messages.getAll)
// router.post('/messages', messages.create)
// router.delete('/messages/:id', messages.destroy)

router.get('/', (request, response) => {
  response.end('Homepage')
})

router.get('/api/persons', (request, response) => {
  Phonebook
    .find({})
    .then((persons) => {
      response.json(persons)
    })
})

router.get('/info', (request, response) => {
  Phonebook.find({}).then((result) => {
    const personNumber = result.length
    const date = new Date()
    response.end(`<p>Phonebook has info for ${personNumber} people</p><p>${date}</p>`)
  })
  // console.log('personNumber', personNumber);
})

router.get('/api/persons/:id', (request, response, next) => {
  Phonebook
    .findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

router.delete('/api/persons/:id', (request, response, next) => {
  Phonebook
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
  // .catch(error => {
  //   console.log(error.name);
  //   response.status(204).end()
  // })
})

router.post('/api/persons', (request, response, next) => {
  const { body } = request

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number can\'t be empty',
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  // let error = Phonebook.validateSync()
  // assert.equal(error.errors['eggs'].message,
  // 'Too few eggs');
  // console.log('typeof err', typeof err)
  // console.log('error', error);

  person.save().then((result) => {
    response.json(result)
    console.log(result)
  })
    .catch((error) => next(error))
  // .catch(error => {

  //   console.log(error);
  //   // response.status(400).end()
  //   // response.status(400).json({ error: 'id not match'})
  // })
})

router.put('/api/persons/:id', (request, response, next) => {
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
