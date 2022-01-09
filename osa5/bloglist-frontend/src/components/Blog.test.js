import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: "Testi Blogi",
        author: "Test author",
        url: "test url",
        likes: 2
    }
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Testi Blogi'
    )

    expect(component.container).toHaveTextContent(
        'Test author'
    )
})

test('does not render url and likes', () => {
    const blog = {
        title: "Testi Blogi",
        author: "Test author",
        url: "test url",
        likes: 2
    }
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).not.toHaveTextContent(
        'test url'
    )

    expect(component.container).not.toHaveTextContent(
        'likes: 2'
    )
})

test('render all values when show button has been pressed', () => {
    const blog = {
        title: "Testi Blogi",
        author: "Test author",
        url: "test url",
        likes: 2
    }
    const component = render(
        <Blog blog={blog}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
        'test url'
    )

    expect(component.container).toHaveTextContent(
        'likes: 2'
    )

})
