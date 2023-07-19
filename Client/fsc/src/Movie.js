import React, { useState, useEffect } from 'react';
import './Movie.css';
import { UpdateMovie } from './Update_Mo';
import MovieSub from './MovieSub';


const Movie = ({ movie, updatevar, deletevar,allsubscribes }) => {
  const [showO, setShowO] = useState(true);
  const [showup, setSup] = useState(false);
  const [Genres, setGenres] = useState([]);
  const [showmore, setshowmore] = useState(false);
  const [moreteext, setshowtext] = useState('showmore');
  const [mysub, setmysub] = useState([]);


  useEffect(() => {
    const filteredSubscriptions = allsubscribes.filter(sub => sub.movieid === movie._id);
    setmysub(filteredSubscriptions);
  }, [allsubscribes, movie]);



  const showmorefun = () => {
    setshowmore(!showmore);
    if (!showmore) {
      setshowtext('showless');
    } else {
      setshowtext('showmore');
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const url = 'http://localhost:8000/genres';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setGenres(data[0].Genres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  if (!movie) {
    return null;
  }

  const open = () => {
    setShowO(!showO);
    setSup(!showup);
  };

  const change = () => {
    setShowO(!showO);
    setSup(!showup);
  };

  const premieredDate = new Date(movie.premiered).toLocaleDateString();

  const deleteM = async () => {
    const addUrl = 'http://localhost:8000/movies';
    const params = {
      _id: movie._id,
    };

    console.log(params);
    try {
      const response = await fetch(addUrl, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      console.log('response', response);
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MovieDetails
        movie={movie}
        showO={showO}
        showup={showup}
        open={open}
        showmore={showmore}
        moreteext={moreteext}
        mysub={mysub}
        deleteM={deleteM}
        showmorefun={showmorefun}
        change={change}
        Genres={Genres}
        updatevar={updatevar}
        deletevar={deletevar}
      />
    </div>
  );
};

const MovieDetails = ({
  movie,
  showO,
  showup,
  open,
  showmore,
  moreteext,
  mysub,
  showmorefun,
  deleteM,
  change,
  Genres,
  updatevar,
  deletevar,
}) => {
  const premieredDate = new Date(movie.premiered).toLocaleDateString();

  return (
    <>
      {showO && (
        <div className="movie-container">
          <h2>{movie.name}</h2>
          <img src={movie.ImageUrl} alt={movie.name} />
          <p>Genres: {movie.Genres.join(', ')}</p>
          <p>Year of Release: {premieredDate}</p>

          {updatevar ? (
            <button className="update-button" onClick={open}>
              Update
            </button>
          ) : null}

          {deletevar ? (
            <button className="delete-button" onClick={deleteM}>
              Delete
            </button>
          ) : null}

          <button className='update-button' onClick={showmorefun}>
          {moreteext}
        </button>



        
        </div>
        
      )}


      {showup && (
        <div>
          <UpdateMovie movie={movie} onCancel={change} genres={Genres} />
        </div>
      )}

{showmore && (
          <div>
            <MovieSub mysubscribe={mysub} onCancel={showmorefun} />
          </div>
        )}
    </>
  );
};

export default Movie;