require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')


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

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)

//     if (person) {
//         response.json(person)
//     }
//     response.status(404).end()
// })

// app.get('/info', (request, response) => {
//     const time = new Date()
//     response.send(`<p>Phonebook has info for ${persons.length} people.</p> ${time}`)
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     person = persons.filter(person => person.id !== id)

//     response.status(204).end()
// })

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

    const person = new Contact({
        name: body.name,
        number: body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

//     newPerson = persons.filter(person => person.name === person)

//     if (newPerson) {
//         return response.status(400).json({
//             error: 'Name must be unique'
//         })
//     }

//     persons = persons.concat(persons)

//     response.json(person)
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})