import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { init } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(init())
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}
export default App