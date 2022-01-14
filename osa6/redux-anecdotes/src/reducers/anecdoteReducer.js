import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': 
      const newAnecdote = action.data
      return state.map(a => a.id !== newAnecdote.id ? a : newAnecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE_STATE':
      return action.data
    default: return state
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote  
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_STATE',
      data: anecdotes
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer