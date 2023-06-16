import React from 'react'
const Movie = require('../../../Server/models/MovieModel');
const Member = require('../../../Server/models/MemberModel');



export const Movie = () => {
    
    useEffect(() => {
        async function initilizedataMovie() {
        const allmovies = await Movie.find({});   

          const userResponse = await axios.get(userURL);
          setAllUsers(userResponse.data);
          setUsers(userResponse.data);
        }  
        initilizedataMovie();
      }, []);







  return (
    <div>Movie</div>
  )
}
