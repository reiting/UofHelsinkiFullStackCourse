import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
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
        <ul>
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
        </ul>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)