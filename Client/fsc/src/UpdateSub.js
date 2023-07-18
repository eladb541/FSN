import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddMovie.css';

export const UpdateSub = ({ subscribe, onCancel }) => {
  const [allmovies, setAllMovies] = useState([]);
  const [allmembers, setAllMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(subscribe.membername);
  const [selectedMemberId, setSelectedMemberId] = useState(subscribe.memberId);
  const [selectedMovie, setSelectedMovie] = useState(subscribe.moviename);
  const [selectedMovieId, setSelectedMovieId] = useState(subscribe.movieId);
  const [selectedDate, setSelectedDate] = useState(new Date(subscribe.datemovie));

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
    const memberId = allmembers.find((member) => member.name === selectedMemberValue)?._id || '';
    setSelectedMemberId(memberId);
  };

  const handleMovieChange = (event) => {
    const selectedMovieValue = event.target.value;
    setSelectedMovie(selectedMovieValue);
    setSelectedMovieIdFromName(selectedMovieValue);
  };

  const setSelectedMovieIdFromName = (movieName) => {
    const selectedMovieObj = allmovies.find((movie) => movie.name === movieName);
    if (selectedMovieObj) {
      const { _id: movieId } = selectedMovieObj;
      setSelectedMovieId(movieId);
    } else {
      setSelectedMovieId(subscribe.movieid); // Use the existing movie ID if movie name remains the same
    }
  };

  useEffect(() => {
    setSelectedMovieIdFromName(selectedMovie);
  }, [selectedMovie]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setSelectedMovie(subscribe.moviename);
    setSelectedMovieIdFromName(subscribe.moviename);
  }, [subscribe.moviename]);

  const cancel = () => {
    onCancel();
  };

  const saveSubscription = async () => {
    // Check if any of the required fields is null
    if (!selectedMember || !selectedMovie || !selectedDate) {
      alert('Please select all the required fields.');
      return;
    }
  
    // Input validation checks
   
  
  
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('Please select a future date.');
      return;
    }
  
    const updateUrl = 'http://localhost:8000/subscribes';
    const updatedSubscription = {
      membername: selectedMember,
      memberid: selectedMemberId,
      moviename: selectedMovie,
      movieid: selectedMovieId,
      datemovie: selectedDate, // Convert date to ISO string format
      createdAt: subscribe.createdAt,
    };
  
    const params = {
      obj: updatedSubscription,
      _id: subscribe._id,
    };
  
    try {
      const response = await fetch(updateUrl, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
  
      const data = await response.json();
      console.log(data);
      cancel();
    } catch (error) {
      console.error(error);
    }
    onCancel();
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
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      <button onClick={saveSubscription}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

export default UpdateSub;
