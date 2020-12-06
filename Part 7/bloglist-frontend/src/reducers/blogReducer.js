import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const id = action.data
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const likedBlog = state.find((blog) => (blog.id === id))
      console.log('blog', likedBlog)
      const blogToLike = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }
      return state.map((blog) => (blog.id === id ? blogToLike : blog))
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== id)
    default:
      return state
  }
}

export const createBlog = (data, user) => {
  return async dispatch => {
    let newBlog = await blogService.create(data)
    newBlog = { ...newBlog, user: { name: user.name } }
    console.log('newblog', newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
    console.log('data', data)
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })

  }
}

export const likeBlog = (id, likedBlog) => {
  return async dispatch => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: id ,
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id ,
    })
  }
}

export default blogReducer