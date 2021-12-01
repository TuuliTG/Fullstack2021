import React from "react"

const Total = ({ course }) => {
    const sum = course.parts.map(part =>
        part.exercises).reduce((a,b) => a + b)
    return(
      <p><b>Total of {sum} exercises </b></p>
    ) 
}

export default Total