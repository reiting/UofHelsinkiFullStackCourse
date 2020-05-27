import React from 'react';

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
            {country.languages.map(lang => {
              return <li key={lang.name}>{lang.name}</li>;
            })}
          </ul>
          <img src={country.flag} width='200px' alt={`${country.name} flag`} />
        </div>
    )
}

export default Country;