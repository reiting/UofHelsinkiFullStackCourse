import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Comments = () => {
  const [newComment, setNewComment] = useState()

  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    try {
      const title = newComment?.comment
      const comment = {
        title,
      }
      const blogId = blog.id
      dispatch(createComment(blogId, comment))
      // reset input value
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={addComment}>
      Comment: <Input
        value={newComment}
        onChange={handleCommentChange} />
    <Button type='submit'>Add Comment</Button>
    </form>
  )
}

export default Comments



// const addComment = async (event) => {
//   event.preventDefault()
//   try {
//     const title = inputValue?.comment

//     const comment = {
//       title,
//     }

//     const blogId = blog.id

//     dispatch(createComment(blogId, comment))

//     // reset input value
//     setInputValue({ comment: '' })
//   } catch (err) {
//     console.error(err)
//   }
// }