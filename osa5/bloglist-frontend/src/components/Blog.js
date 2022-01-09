import React, { useState } from 'react'


const Blog = ({blog}) => {
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
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button>like</button></p>
      <p>added by: {blog.user === undefined ?
        'unknown' :
        blog.user.name  
        }
    </p>

      <button onClick={toggleVisibility}>hide</button>
      
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>  
  )
}
export default Blog