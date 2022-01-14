import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification, resetNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    
    return (
      <div>
        <div>
            {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
    
    
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes))
    
    const clickHandler = (anecdote) => {
        dispatch(vote(anecdote.id))
        const text = `You voted '${anecdote.content}'`
        dispatch(changeNotification(text))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
              <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() =>
                  clickHandler(anecdote)
                }
              />
            )}
        </div>
    )
}

export default AnecdoteList
