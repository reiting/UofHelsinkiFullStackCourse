import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <div>
        <Statistic text="good: " value={props.good} />
        <Statistic text="neutral: " value={props.neutral} />
        <Statistic text="bad: " value={props.bad} />
        <Statistic text="all: " value={props.all} />
        <Statistic text="average: " value={(props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all} />
        <Statistic text="positive: " value={`${(props.good / props.all) * 100}%`} />
      </div>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
        <h2>Statistics</h2>
        <Statistics all={all} good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)