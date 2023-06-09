import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Cards = ({searchResult, searchResult2, setSearchResult, setSearchResult2, setTracks, getTracks}) => {
 const ord = (arg)=> {
  arg.sort((a, b) => {
    return new Date(a.release_date) - new Date(b.release_date);
  });
   }

  const reset = ()=>{
    setSearchResult([])
    setSearchResult2([])
    getTracks()
    setTracks([])
   
  }

ord(searchResult2)

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
};

  return (
    <>
     <div className='button-cont'>
        {
          
          searchResult.length >= 1 || searchResult2.length >= 1 ?<button className='button' onClick={reset}>Back to recommendations</button>:null
        }
       </div>
    <div className='carousel'>
       
    <Slider {...settings}>
        {searchResult2?.map((albums) => (
          <div className='carousel-item' key={albums.id}>
          <h3>{albums.name}</h3>
          <p> Realese Date: {albums.release_date}</p>
          <img className='image' src={albums.images[0].url} alt={albums.images} />
          </div>
        ))}
      
        {searchResult?.map((track) => (
        <div className='carousel-item' key={track.id}>
          <h3>{track.name} - {track.artists[0].name}</h3>
          {/* <h3>{track.artists[0].name}</h3> */}
          <p>Album: {track.album.name}</p>
          <img className='carousel-image' src={track.album.images[0].url} alt={track.album.name} />
          <br/>
          <br/>
        </div>
        
        
      )
      
      )} 
     </Slider>
    </div>
    </> )
}

export default Cards
