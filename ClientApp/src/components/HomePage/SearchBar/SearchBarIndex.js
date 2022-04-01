import React from 'react';
import './SearchBarStyle.css';

/**
 * Parameters that gets returned when interacted with search bar
 * 
 * @param { category, handleSearchKey, clearSearch, formSubmit }
 * 
 * @returns category to be searched
 */

const SearchBar = ({ category, handleSearchKey, clearSearch, formSubmit}) => {
    return (
        <div className='searchBar-wrap'>
                <form onSubmit={formSubmit}>
                    <input 
                        type="text" 
                        onChange={handleSearchKey} 
                        placeholder='Search By Category' 
                        value={category} 
                    />
                    {category && <span onClick={clearSearch}>X</span>}

                    <button>Search</button>
                </form>
        </div>
    );
};

export default SearchBar;