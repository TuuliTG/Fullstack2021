import React from 'react'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
const App = () => 
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>

export default App