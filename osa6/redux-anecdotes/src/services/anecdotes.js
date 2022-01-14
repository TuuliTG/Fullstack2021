import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const anecdoteObject = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const vote = async (id) => {
    let res = await axios.get(`${baseUrl}/${id}`)
    const anecdote = res.data
    console.log('voting for', anecdote)
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return res.data
}

export default { getAll, createNew, vote }
