import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
 
  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li>good: {props.good}</li>
        <li>neutral: {props.neutral}</li>
        <li>bad: {props.bad}</li>
        <li>all: {props.all}</li>
        <li>average: {(props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all}</li>
        <li>positive: {`${(props.good / props.all) * 100}%`}</li>
      </ul>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button onClick={handleGood} text='good'></Button>
        <Button onClick={handleNeutral} text='neutral'></Button>
        <Button onClick={handleBad} text='bad'></Button>
      </div>
      <div>
      <Statistics all={all} good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)