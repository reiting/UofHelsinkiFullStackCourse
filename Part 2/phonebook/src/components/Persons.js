import React from 'react';

const Persons = ({ searchResults, deletePerson }) => {
    const entries = () => searchResults.map(person => (
        <li key={person.id}>{person.name + `${' '}`}{person.number + `${' '}`}
            <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
        </li>
    ));
    return (
        <ul>
            {entries()}
        </ul>
    )
}

export default Persons;

