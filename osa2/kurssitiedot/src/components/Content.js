import React from "react"
import Part from './Part'

const Content = ({ course }) => {
    return (
      <div>
        <ul>
          {course.parts.map(part =>
            <li key={part.id}>
              <Part part={part}/>
            </li>
          )}
        </ul>
        
      </div>
    )
  }

export default Content