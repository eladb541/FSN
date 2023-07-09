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
    const addUrl = 'http://localhost:8000/subscribes';
    const newSubscription = {
      membername: selectedMember,
      memberid: selectedMemberId,
      moviename: selectedMovie,
      movieid: selectedMovieId ,
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
  );
};

export default AddSubscribe;
