import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SearchBar2 = ({ token, onSearchResults2, setTracks }) => {
  const reset = () => {
    onSearchResults2([]);
    setTracks([]);
  };
  const [searchTerm, setSearchTerm] = useState("");

  function noResults() {
    Swal.fire({
      icon: "info",
      title: "No Results Found",
      // text: 'No se encontraron resultados.',
    });
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    reset();
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;

      const searchResult2 = data.albums.items;

      if (searchResult2.length === 0) {
        noResults();
        // No se encontraron resultados, puedes manejar esto de acuerdo a tus necesidades
        const response = await axios.get(
          "https://api.spotify.com/v1/search?q=lives&type=album",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSearchResults2(response.data.albums.items);
      } else {
        onSearchResults2(searchResult2);
        setSearchTerm("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="input-container" onSubmit={handleFormSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Search for an artist"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar2;
