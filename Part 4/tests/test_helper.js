const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      name: "Title 1",
      author: "Author 1",
      url: "https://google.com",
      likes: 20
    },
    {
      name: "Title 2",
      author: "Author 2",
      url: "https://facebook.com",
      likes: 10
    }
  ];

  const initialUsers = [
    {
      name: "Test Name",
      username: "testuser",
      passwordHash: "password"
    },
    {
      name: "Test Name 2",
      username: "testuser2",
      passwordHash: "password"
    }
  ];
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

  module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb
  }