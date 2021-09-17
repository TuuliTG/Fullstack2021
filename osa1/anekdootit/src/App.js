import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = (props) => (
  <label>Votes {props.value}</label>
)

const BestAnecdote = (props) => {
  if (props.votes === 0) {
    return (
      <>
      No votes given yet
      </>
    )
  }
  let i = props.array.indexOf(Math.max(...props.array))
  return (
    <>
      <p>
        {props.anecdotes[i]}
      </p>
      <p>Has <span>{props.array[i]}</span> votes</p>
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(new Array(anecdotes.length).fill(0))
  const [votes, setVotes] = useState(0)

  const generate = () => {
    const rnd = Math.floor(Math.random() * (anecdotes.length));
    console.log("random ", rnd)
    setSelected(rnd)
  }
  const vote = () => {
    let numberOfVotes = allVotes[selected] +1    
    let newArray = [...allVotes]
    newArray[selected] = numberOfVotes
    setAll(newArray)
    setVotes(votes + 1)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <Votes value={allVotes[selected]}/>
      <br/>
      <Button handleClick={() => vote()} text="Vote"/>
      <Button handleClick={() => generate()} text="Next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <BestAnecdote array={allVotes} anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App