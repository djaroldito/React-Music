import React, { useState } from 'react';
import axios from 'axios';


function SearchBar({ token, onSearchResults }) {
    //console.log(token)
   
  const [input, setInput] = useState('');
 
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const response = await axios.get('https://api.spotify.com/v1/search',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: `track:${input}`,
          type: 'track'
        }
      }
    );
    const data = await response.data
    const searchResult = data.tracks.items
    onSearchResults(searchResult)
    setInput('')
    
  };

  return (
   
    <form className='input-container' onSubmit={handleSearch}>
      <input className='input'
        type="text"
        placeholder="Search songs..."
        value={input}
        onChange={handleChange}
      />
      <button className='button' type="submit">Search</button>
    </form>
    
    
  );
}

export default SearchBar;