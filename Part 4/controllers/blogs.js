const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    name: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

    const savedBlog = await blog.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    name: 'Cats Rule',
    author: 'Tigress',
    url: 'tigress.com',
    likes: 5
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'You are not authorized to delete this blog' })
  }
})


module.exports = blogRouter
