import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { init } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(init(anecdotes)))
  })
  
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}
export default App