

import './App.css';
import axios from 'axios'
import { React, useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Cards from './components/Cards';
import SearchBar2 from './components/SearchBar2';
import HomeTracks from './components/HomeTracks';
import loading from './loading.gif'

const id = process.env.REACT_APP_ID
const client = process.env.REACT_APP_CLIENT

// const client = process.env.CLIENT 
// console.log(id)
// console.log(client)


function App() {

  const [searchResult, setSearchResult] = useState([])
  const handleResult = (res)=>{
       setSearchResult(res)
       setSearchResult2([])
  }

  const [searchResult2, setSearchResult2] = useState([])
  const handleResult2 = (res)=>{
       setSearchResult2(res)
       setSearchResult([])
  }

    const[tracks, setTracks]=useState([])
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState();
    const tokenRequestRef = useRef(null);
   
    
    
      const getToken = async () => {
        //setLoadingToken(true);
        try {
          if (tokenRequestRef.current) {
            // If tokenRequest already exists, return its promise
            const response = await tokenRequestRef.current;
            setToken(response.data.access_token);
            setTokenExpiration(Date.now() + response.data.expires_in * 1000);
          } else {
            // Otherwise, create a new token request promise
            const tokenRequest = axios.post(
              'https://accounts.spotify.com/api/token',
              `grant_type=client_credentials&client_id=${id}&client_secret=${client}`,
             
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            );
            tokenRequestRef.current = tokenRequest;
            const response = await tokenRequest;
            setToken(response.data.access_token);
            setTokenExpiration(Date.now() + response.data.expires_in * 1000);
          }
        } catch (error) {
          console.error(error);
        } 
      };
 
   
   const getTracks = async ()=>{
    
    console.log(`soy token de getTracks ${token}`)
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
    setTracks(response.data.tracks);
    }
  
    useEffect(() => {
      if (!token || (tokenExpiration && Date.now() > tokenExpiration)) {
        getToken();
      }
      // if (token){getTracks()}
    }, []);

    useEffect(()=>{
      if (token || tracks.length === 0){getTracks()}
    },[token])

  
   //console.log(token)
   //console.log(tracks)
  // if(token === null || Object.values(tracks)===0){
  //   return(
  //     <>
  //       <div className='list' >
  //         <div className='image-cont'>
  //         <img src={loading} alt='loa' />
  //         </div>
  //       </div>
  //     </>
  //   )
  // }
  if(token === null ){
    
    return(
      <>
        <div className='list' >
          <div className='image-cont'>
          <img src={loading} alt='loa' />
          </div>
        </div>
      </>
    )
  }
  
  else if(tracks.length === 0 && searchResult.length === 0 && searchResult2.length === 0 ){
    //console.log(tracks)
    
    return(
      <>
      <div className='container'>
        <SearchBar />
        <SearchBar2 />
      </div>
        <div  >
          <div className='image-cont'>
          <img src={loading} alt='loa' />
          </div>
        </div>
      </>
    )
  }

 

  else{


  return (
    <div>
   
     <div className='container'>
     <SearchBar onSearchResults={handleResult} tracks={tracks} setTracks={setTracks}
    token={token}  />


      <SearchBar2 onSearchResults2={handleResult2} tracks={tracks} setTracks={setTracks}
    token={token} />
     </div>

     {searchResult.length >= 1 || searchResult2.length >= 1  ?<Cards searchResult={searchResult} setSearchResult={setSearchResult} 
      searchResult2={searchResult2} setSearchResult2={setSearchResult2} setTracks={setTracks} getTracks={getTracks} tracks={tracks}  /> : 
       <HomeTracks tracks={tracks}   />
  }
    
    </div>

    



  );}
 };

export default App;
