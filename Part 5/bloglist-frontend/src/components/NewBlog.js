import React from 'react'

const NewBlog = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {

    return (
        <form onSubmit={addBlog}>
            <h1>Create A New Blog</h1>
            title: <input
                id='title'
                value={newTitle}
                onChange={handleTitleChange} />
            author: <input
                id='author'
                value={newAuthor}
                onChange={handleAuthorChange} />
            url: <input
                id='url'
                value={newUrl}
                onChange={handleUrlChange} />
            <button id='create-button' type="submit">Create</button>
        </form>
    )
}

export default NewBlog