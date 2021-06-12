import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.type} part={part} />
      ))}
    </div>
  );
};
export default Content;



