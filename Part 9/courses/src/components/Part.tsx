import React from 'react';
import { CoursePart, assertNever } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
            <p>
              <em>{part.description}</em>
            </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
      case "Advanced":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
              <em>{part.description}</em>
            </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{part.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
            <p>
              <em>{part.description}</em>
            </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
        </div>
      );
      case "Backend development":
      return (
        <div>
          <p>
            <strong>{part.name}</strong>
          </p>
            <p>
              <em>{part.description}</em>
            </p>
          <p>
            Exercises: <strong>{part.exerciseCount}</strong>
          </p>
          <p>
             Requirements: {part.requirements}    
          </p>
          <hr />
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;