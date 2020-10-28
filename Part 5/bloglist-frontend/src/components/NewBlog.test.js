import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import NewBlog from './NewBlog'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()
  
    const component = render(<NewBlog addBlog={addBlog} />)
  
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
  
    fireEvent.change(inputTitle, {
      target: { value: 'Blog Title' },
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Author' },
    })
    fireEvent.change(inputUrl, {
      target: { value: 'http://blog-title.com' },
    })
    fireEvent.submit(form)
  
    expect(addBlog.mock.calls).toHaveLength(1)
  })