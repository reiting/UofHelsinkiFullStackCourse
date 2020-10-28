import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
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

})