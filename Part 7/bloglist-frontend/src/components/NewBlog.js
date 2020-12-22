import React from 'react'
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
const NewBlog = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {

    return (
        <form onSubmit={addBlog}>
            <h1>Create A New Blog</h1>
            title: <Input
                id='title'
                value={newTitle}
                onChange={handleTitleChange} />
            author: <Input
                id='author'
                value={newAuthor}
                onChange={handleAuthorChange} />
            url: <Input
                id='url'
                value={newUrl}
                onChange={handleUrlChange} />
            <Button id='create-button' type="submit">Create</Button>
        </form>
    )
}

export default NewBlog