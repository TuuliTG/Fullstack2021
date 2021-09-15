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

const StatisticsLine = (props) => (
  <>
    <p>{props.text} <span><Label value={props.value}/></span></p>
  </>
)


const Statistics = (props) => {
  const sum = props.good - props.bad
  console.log("good - bad ", sum)
  const avg = sum / props.all
  console.log("avg ", avg)
  if (props.all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticsLine text="Good" value={props.good}/>
      <StatisticsLine text="Neutral" value={props.neutral}/>
      <StatisticsLine text="Bad" value={props.bad}/>
      <StatisticsLine text="All" value={props.all}/>
      <StatisticsLine text="Average" value={avg}/>
      <StatisticsLine text="Positive" value={props.good/props.all}/>
    </div>
  )
  
}



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

  const all = good+bad+neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => increaseGood()} text="good"/>
      <Button handleClick={() => increaseNeutral()} text="neutral"/>
      <Button handleClick={() =>increaseBad()} text="bad"/>
      <Statistics all={all} good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App