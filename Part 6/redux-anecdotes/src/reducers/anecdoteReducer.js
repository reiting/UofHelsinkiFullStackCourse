import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id;
      // const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id);
      // console.log('update', anecdoteToUpdate)
      // const updatedAnecdote = {
      //   ...anecdoteToUpdate,
      //   votes: anecdoteToUpdate.votes + 1,
      // };
      return state.map((anecdote) => (anecdote.id === id ? action.data : anecdote));
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteForAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const newAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer