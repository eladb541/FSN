import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddMovie.css';

export const AddSubscribe = () => {
  const [allmovies, setAllMovies] = useState([]);
  const [allmembers, setAllMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[isadmin,setisadmin]=useState(false)

  
  
  //second.........................................  
  useEffect(() => {
    const checkSession1 = async () => {
   
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
        } else if (!userSession || userSession === ''|| userSession===null) {
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

    checkSession1();
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
            
            const newurl = 'http://localhost:8000/decoder/addsub';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log("per")
            console.log(data)
            if (data!==true) {
              alert("you have no permission to be here")
              window.location.href = '/login';
         
            }
            else{
              setisadmin(true)
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


  useEffect(() => {
    async function fetchMovies() {
      const url = 'http://localhost:8000/movies';
      try {
        const response = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setAllMovies(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchMembers() {
      const url = 'http://localhost:8000/members';
      try {
        const response = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setAllMembers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMembers();
  }, []);

  const handleMemberChange = (event) => {
    const selectedMemberValue = event.target.value;
    setSelectedMember(selectedMemberValue);
  
    // Extract member ID from the selected option
    const memberId = allmembers.find(member => member.name === selectedMemberValue)?._id || '';
    setSelectedMemberId(memberId);
  };
  
  // Function to handle the movie selection change
const handleMovieChange = (event) => {
  const selectedMovieValue = event.target.value;
  setSelectedMovie(selectedMovieValue);
};


const setSelectedMovieIdFromName = (movieName) => {
  const selectedMovieObj = allmovies.find((movie) => movie.name === movieName);
  if (selectedMovieObj) {
    const { _id: movieId } = selectedMovieObj;
    setSelectedMovieId(movieId);
  } 
};


useEffect(() => {
  setSelectedMovieIdFromName(selectedMovie);
}, [selectedMovie]);



  




  
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const saveSubscription = async () => {
    // Check if any of the required fields is null
    if (!selectedMember || !selectedMovie || !selectedDate) {
      alert('Please select all the required fields.');
      return;
    }
  
    const addUrl = 'http://localhost:8000/subscribes';
    const newSubscription = {
      membername: selectedMember,
      memberid: selectedMemberId,
      moviename: selectedMovie,
      movieid: selectedMovieId,
      datemovie: selectedDate,
      craetedaAt: new Date(),
    };
  
    try {
      const response = await fetch(addUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubscription),
      });
      console.log(newSubscription);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {isadmin&&(
      <div>
        
      <div className="label-input">
        <label htmlFor="member">Select Member:</label>
        <select id="member" onChange={handleMemberChange} value={selectedMember}>
  <option value="">Select Member</option>
  {allmembers.map((member) => (
    <option key={member._id} value={member.name}>
      {member.name}
    </option>
  ))}
</select>

      </div>
      <div className="label-input">
        <label htmlFor="movie">Select Movie:</label>
        <select id="movie" onChange={handleMovieChange} value={selectedMovie}>
  <option value="">Select Movie</option>
  {allmovies.map((movie) => (
    <option key={movie._id} value={movie.name}>
      {movie.name}
    </option>
  ))}
</select>

      </div>
      <div className="label-input">
        <label htmlFor="date">Select Date:</label>
        <DatePicker id="date" selected={selectedDate} onChange={handleDateChange} />
      </div>
    
      <button className="save-button" onClick={saveSubscription}>
        Add Subscription
      </button>
      </div>
    )}</div>
  );
};

export default AddSubscribe;
