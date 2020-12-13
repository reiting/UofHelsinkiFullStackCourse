import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMessage } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

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
    } catch (e) {
      dispatch(
        setNotificationMessage({ message: 'Wrong credentials' }, 5)
      )
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const newBlog = await blogService.create(blogObject)
      createBlog(blogObject)
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
      dispatch(
        setNotificationMessage({ message: `a new blog ${newBlog.title} by ${newBlog.author} added` }, 5)
      )
    } catch (error) {
      console.log(error)
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
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">Log In</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New Blog'>
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

  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/users'>Users</Link>
        </div>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
        </Switch>
      </div>
      <div>
        <h2>Blogs</h2>
        <Notification />
        {user === null ?
          loginForm() :
          <div>
            <div>
              <p>{user?.username} is logged in</p>
            </div>
            <div>
              <button type="submit" onClick={handleLogout}>Log Out</button>
              {blogForm()}
            </div>
          </div>
        }
        {blogs.map((blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <ul>
            <li>{blog.title}</li>
          </ul>
          </Link>
        )
        ))}
      </div>
    </Router>

  )
}

export default App



