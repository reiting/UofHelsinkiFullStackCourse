import React from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteList = ({ filter, anecdotes, voteForAnecdote, setNotificationMessage }) => {
    const filteredAnecdotes = anecdotes.filter((a) => {
        if (filter === "") {
            return anecdotes
        }
        return a.content.toLowerCase().includes(filter.toLowerCase())
    })


    const vote = id => {
        voteForAnecdote(id)
        const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
        setNotificationMessage({ message: `You voted for ${votedAnecdote.content}` }, 5)

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

const mapStateToProps = ({ anecdotes, filter }) => {
    return {
        anecdotes,
        filter,
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
    voteForAnecdote,
    setNotificationMessage,
})(AnecdoteList)
export default ConnectedAnecdoteList