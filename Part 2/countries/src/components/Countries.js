import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, please specify another filter</p>
        );
    } else if (countries.length <= 10 && countries.length > 1) {
        const entries = () => countries.map(country => (<li key={country.alpha3Code}>{country.name}</li>));
        return (
            <ul>
                {entries()}
            </ul>
        )
    } else if (countries.length ===1) {
        return (
            <Country country={countries[0]} />
        )
    } else {
        return (
            <p>Too many matches, please specify another filter</p>
        )
    }
}

export default Countries;
