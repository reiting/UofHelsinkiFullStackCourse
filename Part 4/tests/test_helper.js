const Blog = require('../models/blog')

const initialBlogs = [
    {
      name: "Title 1",
      author: "Author 1",
      url: "https://google.com",
      likes: 20
    },
    {
      title: "Title 2",
      author: "Author 2",
      url: "https://facebook.com",
      likes: 10
    }
  ];
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, blogsInDb
  }