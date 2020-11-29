import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    test('renders content', () => {
        const blog = {
            title: 'My blog title',
            author: 'Rachel'
        }

        const component = render(
            <Blog blog={blog} />
        )

        expect(component.container).toHaveTextContent('My blog title')
        expect(component.container).toHaveTextContent('Rachel')
        expect(component.container).not.toHaveTextContent('www.google.com')
    })

    test('at start the children are not displayed', () => {
        const blog = {
            title: 'My blog title',
            author: 'Rachel'
        }

        const component = render(<Blog blog={blog} />)

        const div = component.container.querySelector('.hidden-div')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const blog = {
            title: 'My blog title',
            author: 'Rachel'
        }

        const component = render(<Blog blog={blog} />)
        const button = component.getByText('View')
        fireEvent.click(button)

        const div = component.container.querySelector('.hidden-div')
        expect(div).not.toHaveStyle('display: none')
    })

    test('when clicking like button twice, it\'s called twice', () => {
        const blog = {
            title: 'My blog title',
            author: 'Rachel',
            likes: 4
        }

        const clickLike = jest.fn()
        const component = render(<Blog blog={blog} addLike={clickLike}/>)        

        const likeButton = component.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(clickLike.mock.calls.length).toBe(2)
    })
})
