import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))    
        const text = `You created a new anecdote '${content}'`
        dispatch(changeNotification(text, 5))
    }
    
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
        </form>
      </div>
    )
}
export default AnecdoteForm