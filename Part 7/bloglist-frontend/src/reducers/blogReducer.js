import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      console.log('blahhhh', action.data)
      return [...state, action.data]
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

export default blogReducer