import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm calls addBlog with right parameters', () => {
    const addBlog = jest.fn()

    const component = render(
        <BlogForm addBlog={addBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form =component.container.querySelector('form')


    fireEvent.change(title, {
        target: { value: 'Testing the title'}
    })

    fireEvent.change(author, {
        target: { value: 'Testing the author'}
    })


    fireEvent.change(url, {
        target: { value: 'Testing the url'}
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Testing the title')
    expect(addBlog.mock.calls[0][0].author).toBe('Testing the author')
    expect(addBlog.mock.calls[0][0].url).toBe('Testing the url')

})