import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  const parts = props.parts.map(part =>
    <Part key={part.name} name={part.name} exercises={part.exercises}></Part>
  )
  return (
    <div>
      {parts}
    </div>
  )
}

const Part = (props) => {
  return (
      <p>
       {props.name + ' '}
       {props.exercises}
      </p>
  )
}

const Total = (props) => {
  const add = (a, b) => 
    a + b;

  return (
    <p>
      Number of exercises: {props.parts.map(part => part.exercises).reduce(add)}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))