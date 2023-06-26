import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import './Movies.css';
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [allmovies, setallmovies] = useState([]);
  const [showmovies, setshowmovies] = useState([]);
  const [search, setSearch] = useState("");
  const [maxId, setMaxId] = useState(null);

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
  }, []);


  useEffect(() => {
    async function fetchDatachange() {
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
    fetchDatachange();
  }, [allmovies]);















  useEffect(() => {
    setshowmovies(allmovies);
  }, [allmovies]);

  useEffect(() => {
    if (search !== "") {
      const filteredMovies = allmovies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
      );
      setshowmovies(filteredMovies);
    } else {
      setshowmovies(allmovies);
    }
  }, [search, allmovies]);

  const findLargestId = () => {
    fetch("https://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((data) => {
    const genres = new Set();
    data.forEach((show) => {
      show.genres.forEach((genre) => {
        genres.add(genre);
      });
    });
    console.log(Array.from(genres));
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });
  }

  return (
    <div>
      <div className="fixed-container">
        <input
          type="text"
          className="fixed-search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={findLargestId}>click me</button>
   
      <div className="movies-container">
        {showmovies.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
      <div>
        <Link to="/addmovie">
          <button className="add-movie-button">Add New Movie</button>
        </Link>
      </div>
    </div>
  );
};

export default Movies;
