import React from 'react';

const Persons = ({ searchResults }) => {
    const entries = () => searchResults.map(person => (<li key={person.name}>{person.name}{person.number}</li>));
    return (
        <ul>
            {entries()}
        </ul>
    )
}

export default Persons;

