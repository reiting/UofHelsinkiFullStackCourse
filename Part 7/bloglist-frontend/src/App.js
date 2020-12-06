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
    } catch (e) {
      dispatch(
        setNotificationMessage({ message: 'Wrong credentials' }, 5)
      )
    }
  }

  // const handleCreateBlog = (event) => {
  //   event.preventDefault()
  //   try {
  //     const title = inputValue?.title
  //     const author = inputValue?.author
  //     const url = inputValue?.url
  //     const likes = 0

  //     const blog = {
  //       title,
  //       author,
  //       url,
  //       likes,
  //     }

  //     createBlog(blog)

  //     // reset input values
  //     setInputValue({ author: '', title: '', url: '' })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

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

  // const addLike = async blog => {
  //     const updatedBlog = {
  //       user: blog.user.id,
  //       likes: blog.likes + 1,
  //       author: blog.author,
  //       title: blog.title,
  //       url: blog.url
  //     }

  //     try {
  //       const response = await blogService.update(blog.id, updatedBlog)
  //       setBlogs(blogs.map(blog => (blog.id !== response.id ? blog : response)))
  //     } catch (error) {
  //       console.log(error)
  //       setNotificationMessage(error.message)
  //       setTimeout(() => {
  //         setNotificationMessage(null)
  //       }, 3000)
  //     }
  //   }

  //   const handleDelete = async blog => {
  //     if (window.confirm(`Are you sure you want to delete ${blog.title}??`)) {
  //       try {
  //         const response = await blogService.remove(blog.id)
  //         console.log(response)
  //         setBlogs(blogs.filter(b => b.id !== blog.id))
  //       } catch (error) {
  //         console.log(error)
  //         setNotificationMessage(error.message)
  //         setTimeout(() => {
  //           setNotificationMessage(null)
  //         }, 3000)
  //       }
  //     }
  //   }

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

    return (
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
          />
        )}
              </div>
    )
  }

  export default App