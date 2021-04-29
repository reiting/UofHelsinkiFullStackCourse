import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;