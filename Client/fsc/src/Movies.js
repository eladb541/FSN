import React, { useEffect, useState } from 'react';
import  Movie  from './Movie'; // Update the import

export const Movies = () => {
  const [allmovies, setallmovies] = useState([]);
  const[showmovies,setshowmovies]=useState([])

  useEffect(() => {
    async function fetchData() {
      const url = 'http://localhost:8000/movies';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setallmovies(data);
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [allmovies]);


  useEffect(() => {
    async function sshowmovies() {
      setshowmovies(allmovies)

    }
    sshowmovies();
  }, [allmovies]);




  return (
    <div>
      {showmovies.map((movie) => (
       <Movie key={movie._id} movie={movie}/>
       
      ))}
    </div>
  );
};

export default Movies;
