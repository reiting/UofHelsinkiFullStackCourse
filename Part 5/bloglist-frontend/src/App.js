import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('null')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [notification, setNotification] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      (blogObject)
      .then(returnedBlog => {
        setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  }

  const addLike = async blog => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(blog => (blog.id !== response.id ? blog : response)))
    } catch (error) {
      console.log(error)

      setNotification(error.message)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New Note'>
      <NewBlog
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange} 
      />
    </Togglable>
  )


  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage ? (
        <Notification message={errorMessage} hasError={true} />
      ) : null}
      {notification ? <Notification message={notification} /> : ''}
      {user === null ?
        loginForm() :
        <div>
            <p>{user?.username} is logged in</p>
            <button type="submit" onChange={handleLogout}>Log Out</button>
            {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}
/>
      )}
    </div>
  )

}

export default App