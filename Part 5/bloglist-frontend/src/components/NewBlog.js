import React from 'react'

const NewBlog = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {

    return (
        <form onSubmit={addBlog}>
            <h1>Create A New Blog</h1>
            title: <input
                value={newTitle}
                onChange={handleTitleChange} />
            author: <input
                value={newAuthor}
                onChange={handleAuthorChange} />
            url: <input
                value={newUrl}
                onChange={handleUrlChange} />
            <button type="submit">Create</button>
        </form>
    )
}

export default NewBlog