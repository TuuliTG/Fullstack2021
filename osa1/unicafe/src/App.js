import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Label = (props) => (
  <label>
    {props.value}
  </label>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    console.log("Increase good")
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => increaseGood()} text="good"/>
      <Button handleClick={() => increaseNeutral()} text="neutral"/>
      <Button handleClick={() =>increaseBad()} text="bad"/>
      <h1>Statistics</h1>
      <p>good <span><Label value={good}/></span></p>
      <p>neutral <span><Label value={neutral}/></span></p>
      <p>bad <span><Label value={bad}/></span></p>
    </div>
  )
}

export default App