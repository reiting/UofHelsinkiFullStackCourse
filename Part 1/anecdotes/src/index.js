import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voteForAnecdote = () => {
    let voteCopy = [...vote];
    voteCopy[selected] += 1;
    setVote(voteCopy);
  }

  const maxVotes = () => {
    const maxIndex = vote.indexOf(Math.max(...vote));
    return maxIndex;
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <p>Has {vote[selected]} votes</p>
      </div>
      <div>
        <Button onClick={voteForAnecdote} text='vote'></Button>
        <Button onClick={randomAnecdote} text='next anecdote'></Button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[maxVotes()]}
        <br></br>
        Has {vote[maxVotes()]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)