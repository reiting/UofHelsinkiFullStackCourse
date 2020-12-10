import React from 'react'
import { useSelector } from "react-redux"
import { useRouteMatch } from 'react-router-dom'


const User = () => {
  const users = useSelector((state) => state.users)
  console.log('users', users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users?.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
