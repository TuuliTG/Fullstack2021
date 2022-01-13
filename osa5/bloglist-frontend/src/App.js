import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
 const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const messageSetup = ( message, classText ) => {
    const msg = {text: message, classText: classText}
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('logged out')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      messageSetup(`Log in successfull`, 'message')
    } catch (exception) {
      messageSetup('wrong credentials', 'error')
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
    messageSetup(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'message')
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log('updating blog',blog)
    const updatedBlog = {...blog, likes: blog.likes + 1, new:true}
    console.log('likes now', updatedBlog.likes)

    try {
      const receivedBlog = await blogService.update(id, updatedBlog)
      console.log('received: ',receivedBlog)
      setBlogs(blogs.map(b => b.id !== id ?
        b : receivedBlog)
        .sort((a,b) => b.likes - a.likes)
      )
    } catch (exception) {
      messageSetup('Not able to like the blog', 'error')
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(b => b.id !== id).sort((a,b) => b.likes - a.likes))
      } catch (exception) {
        messageSetup(exception.response.data, 'error')
      }
    } 
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create a new Blog" ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
      />
    </Togglable>
  )
  
  const loginForm = () => {
    return (
      <Togglable buttonLabel="Log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  const showBlogs = () => {
    return (
      <div>
          <p>{user.name} logged in <button id="logout-button" onClick={handleLogout}>Logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}/>
          )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        showBlogs()
      }
      
  </div>
  )
}

export default App