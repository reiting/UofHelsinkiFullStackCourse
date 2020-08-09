const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

// Configure morgan to log body of POST request
morgan.token('person', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
  })
  
  // json-parser
  app.use(express.json())
  
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :person',
    ),
  )

let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Mary Smith",
        "number": "875",
        "id": 6
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    response.status(404).end()
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p> ${time}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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

    const person = {
        name: body.name,
        number: body.number,
        // id: generateId(),
    }

    newPerson = persons.filter(person => person.name === person)

    if (newPerson) {
        return response.status(400).json({
            error:'Name must be unique'
        })
    }

    persons = persons.concat(persons)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})