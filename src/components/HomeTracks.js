
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import '../App.css'
import loading from '../loading.gif'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeTracks = ({ tracks }) => {

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 3
  // };
       
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 elementos en pantallas más grandes
    slidesToScroll: 2,
  
    responsive: [
      {
        breakpoint: 768, // Define el punto de quiebre para dispositivos móviles
        settings: {
          infinite: false,
          slidesToShow: 2, // Muestra 2 elementos en dispositivos móviles
          slidesToScroll: 1 ,
          swipeToSlide: true
  
         
        },
      },
    ],
  };
    const cut =(arg)=>{
    let res = arg.split(' ')
    let res1 = res.splice(0,6)
    return res1.join(' ') 
   
           }
 
 

          const artist = (arg)=>{
           // console.log(arg)
            if(arg.length > 1)
            {
                let names = arg.map((el)=>el.name)
            return names.join(', ')
        }else{
             arg = arg.map((el)=>el.name)
            return arg
            }         
           
            
          }
         
            
  return (
    // <Slider {...settings}>
    <div className='carousel'>

       <div className='title'>
       <h1>Arielito's Recommended Pop songs!!!</h1>
       </div>
       <Slider {...settings}>
      
        {tracks.map((el) => (
          <div className="carousel-item1"  key={el.id}>
            
          <h3>{cut(el.name)}</h3>
          <img className="image" src={el.album.images[0].url} alt='alb' />
          <p>{artist(el.artists)}</p>
            
          </div>  
        ))}

     

      </Slider>
    </div>
    // </Slider>
  )
}

export default HomeTracks
