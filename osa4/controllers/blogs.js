const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log('user: ',user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    console.log("user who is trying to delete", user.name)

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log("Blog has been added by",blog.user)
    console.log("1", blog.user.toString())
    console.log("2", user.id.toString())

    if ( blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Can only be deleted by the user who has added the blog' })        
    }
    
    
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id
    const blog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter