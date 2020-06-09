import React, { useState, useEffect } from 'react';
import './App.css';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  //gets info from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //goes through names and lowercases them all to avoid confusion. Then sets the results variable 
  //to the person on the list who matches the search term entered
  useEffect(() => {
    const results = persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  //creates new person object and if that person is not in the phonebook, adds them. If they are, alerts user.
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(cred => cred.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
        personService
          .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
            })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons searchResults={searchResults} />
    </div>
  )
}

export default App
