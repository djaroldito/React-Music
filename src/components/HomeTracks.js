
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import '../App.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeTracks = ({ tracks }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
          

          const artist = (arg)=>{
            console.log(arg)
            if(arg.length > 1)
            {
                let names = arg.map((el)=>el.name)
            return names.join(', ')
        }else{
             arg = arg.map((el)=>el.name)
            return arg
            }         
           
            
          }
         
        //   useEffect(() => {
            
        //  getTracks()
         
           
          
          
        //   }, []);

         
  return (
    // <Slider {...settings}>
    <div className='carousel'>

       <div className='title'>
       <h1>Arielito's Recommended Rock songs!!!</h1>
       </div>
       <Slider {...settings}>
      
        {tracks.map((el) => (
          <div className="carousel-item"  key={el.id}>
            
          <h3>{el.name}</h3>
          <p>{artist(el.artists)}</p>
          <img className="carousel-image" src={el.album.images[0].url} alt='alb' />
            
          </div>  
        ))}

     

      </Slider>
    </div>
    // </Slider>
  )
}

export default HomeTracks
