import React, { useState } from 'react'


const Blog = ({blog, likeBlog, deleteBlog, user}) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if(visible) {
    return(
      <div style={blogStyle}>
      <p><b id="b-title">{blog.title}</b> by <b>{blog.author}</b></p>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button id="like-button" onClick={() => likeBlog(blog.id)} >like</button></p>
      <p>added by: {blog.user === undefined ?
        'unknown' :
        blog.user.name  
        }
    </p>
      {user.username === blog.user.username ?
          <button id="delete-button" onClick={() => deleteBlog(blog.id)}>Delete</button>
          :
          <p></p>
      } 
      
      <button onClick={toggleVisibility}>hide</button>
      
      </div>
    )
  }

  return (
    <div id={blog.title.replace(/ /g, '')} style={blogStyle}>
      <p><b id="b-title">{blog.title}</b> by <b>{blog.author}</b></p>
      <button id="view-button" onClick={toggleVisibility}>view</button>
    </div>  
  )
}
export default Blog