import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => {
  let value = props.value 

  if (props.text === "Positive") {
    value = value * 100
    value = value.toFixed(1)
    return (
      <>
        <td>{props.text}</td>
        <td>{value} %</td>
      </>
    )
  }
  return (
    <>
      <td>{props.text}</td>
      <td>{value} </td>
    </>
  )
}


const Statistics = (props) => {
  const sum = props.good - props.bad
  let avg = sum / props.all
  avg = avg.toFixed(1)
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
      <table>
        <tbody>
          <tr>
          <StatisticsLine text="Good" value={props.good}/>
          </tr>
          <tr>
          <StatisticsLine text="Neutral" value={props.neutral}/>
          </tr>
          <tr>
          <StatisticsLine text="Bad" value={props.bad}/>
          </tr>
          <tr>
          <StatisticsLine text="All" value={props.all}/>
          </tr>
          <tr>
          <StatisticsLine text="Average" value={avg}/>
          </tr>
          <tr>
          <StatisticsLine text="Positive" value={props.good/props.all}/>
          </tr>
        </tbody>
      </table>
    </div>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
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