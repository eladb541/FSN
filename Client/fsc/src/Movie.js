import React from 'react';
import './Movie.css';

export const Movie = ({ movie }) => {
 
  if (!movie) {
    return null; 
  }

  const premieredDate = new Date(movie.premiered).toLocaleDateString();

  return (
    <div>
      <div className='movie-container'>
        <h2>{movie.name}</h2>
        <img src={movie.ImageUrl} alt={movie.name} />
        <p>Genres: {movie.Genres.join(', ')}</p>
        <p>Year of Release: {premieredDate}</p>
      </div>
    </div>
  );
};

export default Movie;
