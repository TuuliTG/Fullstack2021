const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Title1',
        author: 'Author1',
        url: 'url1',
        likes: 3
    },
    {
        title: 'Title2',
        author: 'Author2',
        url: 'url2',
        likes: 5
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'toBeRemoved', author:'authorToBeDeleted', url: "some url"})
    await blog.save()
    await blog.remove()

    return blog.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}