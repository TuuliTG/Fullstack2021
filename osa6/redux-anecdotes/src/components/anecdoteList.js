import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification} from '../reducers/notificationReducer'
import Filter from './filter'

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
    let filter = useSelector(state => state.filter)
    filter = filter.toLowerCase()
    const prevTimeOut = useSelector(state => state.notification.timeOutId)
    const clickHandler = async (anecdote) => {
        dispatch(vote(anecdote.id))
        const text = `You voted '${anecdote.content}'`
        
        dispatch(changeNotification(text, 5, prevTimeOut))
    }

    return(
        <div>
            <Filter />
            <h2>Anecdotes</h2>
            {anecdotes.filter(a => a.content.toLowerCase().includes(filter)).map(anecdote =>
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
