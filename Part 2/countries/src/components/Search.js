import React from 'react';

const Search = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
        filter countries <input
                value={searchTerm}
                onChange={handleSearchChange} />
        </div>
    )
}

export default Search;