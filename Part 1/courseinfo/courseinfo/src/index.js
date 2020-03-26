import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

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
      <Content 
        part1={parts[0].name} exercises1={parts[0].exercises} 
        part2={parts[1].name} exercises2={parts[1].exercises}
        part3={parts[2].name} exercises3={parts[2].exercises}
      />
      <Total 
        exercises1={parts[0].exercises}
        exercises2={parts[1].exercises}
        exercises3={parts[2].exercises}
      />
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
  return (
   <div>
     <Part part1={props.part1} exercises1={props.exercises1} />
     <Part part2={props.part2} exercises2={props.exercises2} />
     <Part part3={props.part3} exercises3={props.exercises3} />
   </div>
  )
}

const Part = (props) => {
  return (
     <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))