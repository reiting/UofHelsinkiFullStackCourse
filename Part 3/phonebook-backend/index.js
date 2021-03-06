
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.static('build'))
app.use(bodyParser.json())

// Configure morgan to log body of POST request
morgan.token('person', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person',
  ),
)
app.use(cors())
// json-parser
// app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts.map(contact => contact.toJSON()))
  })
})

app.get('/info', (request, response, next) => {
  var d = Date(Date.now())
  d = d.toString()
  Contact.find({}).then(result => {
    response.send(
      `<p>Phonebook has info for ${result.length} people</p>
            ${d}
            `
    )
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const person = new Contact({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})