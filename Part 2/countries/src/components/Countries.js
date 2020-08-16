import React from 'react';
import Country from './Country';

const Countries = ({ countries, setSearchTerm }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, please specify another filter</p>
        );
    } else if (countries.length <= 10 && countries.length > 1) {
        //map through the countries and if the button is clicked set the searchTerm to equal the 
        //country.name so that we are taken to that view
        const entries = () => countries.map(country =>
            (<div key={country.alpha3Code}>
                <p>{country.name}
                    <button onClick={() => setSearchTerm(country.name)}>show</button>
                </p>
            </div>));
        return (
            <ul>
                {entries()}
            </ul>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    } else {
        return (
            <p>No matches, please specify another filter</p>
        )
    }
}

export default Countries;
