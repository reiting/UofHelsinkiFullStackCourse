const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs should contain id property (not _id)', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    name: 'Cats Rule',
    author: 'Tigress',
    url: 'tigress.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtend = await helper.blogsInDb()
  expect(blogsAtend.length).toBe(helper.initialBlogs.length + 1)

  const name = blogsAtend.map(b => b.name)
  expect(name).toContain(
    'Cats Rule'
  )
})

test('if likes property is missing, value will default to 0', async () => {
  const newBlog = {
    name: 'Cats Rule',
    author: 'Tigress',
    url: 'tigress.com',
  };

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()

console.log(blogsAtEnd)
expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
});

afterAll(() => {
  mongoose.connection.close()
})