import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import './Movies.css';
import { Link } from 'react-router-dom';


export const Movies = () => {
  const [allmovies, setallmovies] = useState([]);
  const [showmovies, setshowmovies] = useState([]);
  const [search, setSearch] = useState("");
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[creatM,screatM]=useState(false)
  const[deleteM,sdeleteM]=useState(false)
  const[updateM,supdateM]=useState(false)
  const[viewM,sviewM]=useState(false)
  const [allsubscribes, setAllSubscribes] = useState([]);



  useEffect(() => {
    async function fetchDatachange() {
      const url = 'http://localhost:8000/subscribes';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        if (allsubscribes!==data) {
          setAllSubscribes(data);
        }        
      } catch (error) {
        console.error(error);
      }
    }
    fetchDatachange();
  }, [allsubscribes]);


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


  
  
  //second.........................................  
  useEffect(() => {
    const checkSession = async () => {
   
    const url = 'http://localhost:8000/sessionk';

      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        console.log(data);
        if (!data || data === '') {
          alert('Server problem');
          window.location.href = '/login';
        } else if (!userSession || userSession === ''||userSession===null) {
          alert('Session key is empty');
          window.location.href = '/login';
        } else {
          const obj={
            secretKeyToCompare : data.key,
            mysession: userSession

          }
          
          try {
            
            const newurl = 'http://localhost:8000/decoder';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log(data)
            if (data.isauto!==true) {
              alert('there is not match');
              window.location.href = '/login';
            }


            // Token is valid, continue with your logic...
          } catch (error) {
            alert('Session key is not correct');
            console.error(error);
            console.log("2 catch")
            window.location.href = '/login';
          }
        }
      } catch (error) {
        alert('Session key is not correct');
        console.log("1 catch")
        console.error(error);
        window.location.href = '/login';
      }
    };

    checkSession();
  }, [userSession]);


    //third
//................................................






    useEffect(() => {
      const checkSession = async () => {
     
      const url = 'http://localhost:8000/sessionk';
    
        try {
          const resp = await fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await resp.json(); 
        if (data) {
          const obj={
            secretKeyToCompare : data.key,
            mysession: userSession
    
          }
          
          try {
            
            const newurl = 'http://localhost:8000/decoder/movies';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log("per")
            console.log(data)
            if (data) {
              screatM(data.creatMo)
          sdeleteM(data.deleteMo)
          supdateM(data.updateMo)
          sviewM(data.viewMo)
            
    
    
    
    
            }
    
          } catch (error) {
            console.log("arrive 65")
            console.error(error);
    
          }
    
    
        }
        }
          catch (error) {
            console.log("arrive 66")
            console.error(error);
    
          }}
          checkSession();
        }, [userSession]);



  

  return (
    <div>
      <br/>
      <br/>
      <div className="fixed-container">
        <input
          type="text"
          className="fixed-search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
   {viewM &&(
      <div className="movies-container">
        {showmovies.map((movie) => (
          <Movie key={movie._id} movie={movie} updatevar={updateM} deletevar={deleteM} allsubscribes={allsubscribes} />
        ))}
      </div>
      )}
   
      {creatM &&(
      <div>
        <Link to="/addmovie">
          <button className="add-movie-button">Add New Movie</button>
        </Link>
      </div>
      )}
    </div>
  );
};

export default Movies;
