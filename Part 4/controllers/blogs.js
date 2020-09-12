const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const blogRouter = require('express').Router()

const app = express()

// app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
