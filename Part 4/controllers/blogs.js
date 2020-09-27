const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    name: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

module.exports = blogRouter
