const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': 
      const id = action.id.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE_STATE':
      return action.data
    default: return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const init = (anecdotes) => {
  return {
    type: 'INITIALIZE_STATE',
    data: anecdotes
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id: { id }
  }
}

export default reducer