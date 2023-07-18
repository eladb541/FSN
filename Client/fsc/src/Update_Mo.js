import React, { useEffect, useState } from 'react';

export const UpdateMovie = ({ movie, onCancel, genres }) => {
  const [name, setName] = useState(movie.name);
  const [selectedDate, setSelectedDate] = useState(new Date(movie.premiered));
  const [selectedGenres, setSelectedGenres] = useState(movie.Genres ? [...movie.Genres] : []);
  const [imageUrl, setImageUrl] = useState(movie.ImageUrl);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGenreChange = (index, event) => {
    const updatedGenres = [...selectedGenres];
    updatedGenres[index] = event.target.value;
    setSelectedGenres(updatedGenres);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };














  
  const saveChanges = async () => {
    // Input validation checks
    const nameRegex = /^[A-Za-z0-9\s]+$/;
    if (!nameRegex.test(name)) {
      alert('Name should contain only letters, numbers, and spaces.');
      return;
    }
  
    if (selectedGenres.length !== 3 || new Set(selectedGenres).size !== selectedGenres.length) {
      alert('Please select three different genres.');
      return;
    }
  
    if (imageUrl.trim() === '') {
      alert('ImageUrl should not be empty.');
      return;
    }
  
    if (selectedDate === null) {
      alert('Please select a premiered date.');
      return;
    }
  
    // Save changes logic
    const updateUrl = 'http://localhost:8000/movies';
    const updatedMovie = {
      name: name,
      premiered: selectedDate,
      Genres: selectedGenres,
      ImageUrl: imageUrl,
    };
  
    const params = {
      obj: updatedMovie,
      _id: movie._id,
    };
    console.log(params);
  
    try {
      const response = await fetch(updateUrl, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  
    onCancel();
  };
  

  return (
    <div className="update-container">
      <div className="label-input">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div className="label-input">
        <label htmlFor="premiered">Premiered:</label>
        <input
          type="date"
          id="premiered"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>

      {selectedGenres.map((genre, index) => (
        <div className="label-input" key={index}>
          <label htmlFor={`genres-${index + 1}`}>{`Genres ${index + 1}:`}</label>
          <select
            id={`genres-${index + 1}`}
            onChange={(e) => handleGenreChange(index, e)}
            value={selectedGenres[index]}
          >
            <option value="">Select Genre</option>
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="label-input">
        <label htmlFor="imageUrl">ImageUrl:</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
      </div>

      <button className="update-button" onClick={saveChanges}>
        Save Changes
      </button>
      <br />
      <button className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
      
    </div>
  );
};

export default UpdateMovie;
