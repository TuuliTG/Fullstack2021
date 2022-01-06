const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})
test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog 2 is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('Title2')
})

test('blog has a identifier called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'test url',
        likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('test blog')
})

test('a new blog is set to 0 likes by default', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'test url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(b => b.title === 'test blog')
    expect(addedBlog.likes).toBe(0)

})

test('if blog doesnt have a title status 400 is received', async () => {
    const newBlog = {
        author: 'author failed',
        url: 'test url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map(r => r.author)
    expect(authors).not.toContain('author failed')
})

test('if blog doesnt have an author status 400 is received', async () => {
    const newBlog = {
        title: "Test title",
        url: 'test url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain('Test title')
})

test('if blog doesnt have a title nor an author status 400 is received', async () => {
    const newBlog = {
        url: 'test url'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).not.toContain('test url')
})

afterAll(() => {
    mongoose.connection.close()
})