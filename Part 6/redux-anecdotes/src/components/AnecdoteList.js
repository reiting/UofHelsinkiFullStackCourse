import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer, { voteForAnecdote } from '../reducers/anecdoteReducer'
import { removeNotificationMessage, setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)

    const filteredAnecdotes = anecdotes.filter((a) => {
        if (filter === "") {
            return anecdotes
        }
        return a.content.toLowerCase().includes(filter.toLowerCase())
    })

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteForAnecdote(id))
        const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
        dispatch(
            setNotificationMessage({ message: `You voted for ${votedAnecdote.content}` })
        );
        setTimeout(() => {
            dispatch(removeNotificationMessage());
        }, 5000);
    }

    filteredAnecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList