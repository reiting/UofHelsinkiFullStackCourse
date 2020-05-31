import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  //get data from api
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  //gets the list of all the countries and filters through them based on the searchTerm
  const listOfCountries = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <form>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Countries countries={listOfCountries} setSearchTerm={setSearchTerm} />
    </form>
  )
}

export default App;



