

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.id;
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id);
      console.log('update', anecdoteToUpdate)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id === id ? updatedAnecdote : anecdote));
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteForAnecdote = id => {
  return {
    type: 'VOTE',
    id
  }
}

export const newAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer