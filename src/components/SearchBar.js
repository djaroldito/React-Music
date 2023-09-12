import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function SearchBar({ token, onSearchResults, setTracks }) {

  const reset = ()=>{
    onSearchResults([])
    setTracks([])
      }
  
  const [input, setInput] = useState('');
 
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  function noResults() {
    Swal.fire({
      icon: 'info',
      title: 'No Results Found',
      // text: 'No se encontraron resultados.',
    });
  }

  const handleSearch = async (event) => {
    event.preventDefault();

    reset()
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
    //onSearchResults(searchResult)

    if (searchResult.length === 0) {
      noResults()
      // No se encontraron resultados, puedes manejar esto de acuerdo a tus necesidades
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10, // Limitamos a 10 canciones
        seed_genres: 'pop', // Género de las recomendaciones
      },
    })
    //console.log(response)
    
      onSearchResults(response.data.tracks)

      //onSearchResults('')
    } else {
      // Se encontraron resultados, actualiza el estado
      onSearchResults(searchResult);
     
    }



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