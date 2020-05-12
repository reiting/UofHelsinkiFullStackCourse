import React from 'react';

const Total = ({ parts }) => {
  const add = (a, b) => 
    a + b;
  const sum = parts.map(part => part.exercises).reduce(add);

  return (
    <p>Number of exercises: {sum}</p>
  )
}

export default Total;
