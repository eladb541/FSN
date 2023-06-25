import React from 'react';

export const Movie = ({ movie }) => {



    
  // Check if movie prop is null
  if (!movie) {
    return null; // or return a placeholder component/error message
  }

  return (
    <div>
      <h2>{movie.name}</h2>
      <img src={movie.ImageUrl} alt={movie.name} />
      <p>Genres: {movie.Genres.join(', ')}</p>
      <p>Year of Release: {movie.premiered}</p>
    </div>
  );
};
