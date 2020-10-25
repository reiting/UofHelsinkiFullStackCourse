import React, { useState } from 'react'

const Blog = ({ blog, addLike, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setDetailsVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible}>
      <button onClick={() => setDetailsVisible(false)}>Hide</button>
        <li>
          {blog.author}
        </li>
        <li>
          {blog.url}
        </li>
        <li>
          {blog.likes}
          <button onClick={() => addLike(blog)}>Like</button>
        </li>
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog


