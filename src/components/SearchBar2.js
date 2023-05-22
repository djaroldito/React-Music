import { useState } from 'react';
import axios from 'axios';

const SearchBar2 = ({ token, onSearchResults2 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data
      
      const searchResult2 = data.albums.items
      onSearchResults2(searchResult2)
      setSearchTerm('')
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className='input-container' onSubmit={handleFormSubmit}>
        <input className='input'
          type="text"
          placeholder="Search for an artist"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='button' type="submit">Search</button>
      </form>
     
    </div>
  );
};

export default SearchBar2;