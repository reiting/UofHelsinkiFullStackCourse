import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useRouteMatch, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()
  const history = useHistory()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async blog => {
    const updatedBlog = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      dispatch(
        likeBlog(blog.id, updatedBlog)
      )
    } catch (error) {
      console.log(error)
      setNotificationMessage(error.message)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}??`)) {
      try {
        dispatch(removeBlog(blog.id))
        history.push('/blogs')
      } catch (error) {
        console.log(error)
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <li>
          {blog.url}
        </li>
        <li id='likes-number'>
          {blog.likes}
          <button id='like-button' onClick={() => addLike(blog)}>Like</button>
        </li>
        <button id='delete-button' onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog


