import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddMovie.css';

export const Addmovie = () => {
  const [Genres, setGenres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectname, setname] = useState(null);
  const [selectImageUrl, setImageUrl] = useState(null);
  const [Genres1, setGenre1] = useState(null);
  const [Genres2, setGenre2] = useState(null);
  const [Genres3, setGenre3] = useState(null);
  const [id, setid] = useState(null);
  const [uniqueid, setunique] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlenameChange = (event) => {
    setname(event.target.value);
  };

  const handleimageChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleGenre1Change = (event) => {
    setGenre1(event.target.value);
  };

  const handleGenre2Change = (event) => {
    setGenre2(event.target.value);
  };

  const handleGenre3Change = (event) => {
    setGenre3(event.target.value);
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
        setGenre1(data[0].Genres[0]);
        setGenre2(data[0].Genres[0]);
        setGenre3(data[0].Genres[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const updateMaxSid = async () => {
      if (uniqueid !== null && id !== null) {
        const url = 'http://localhost:8000/maxsId';
        const newmaxSid = {
          _id: uniqueid, // Use the updated uniqueid value
          maxid: id, // Use the updated id value
        };

        console.log(newmaxSid);
        try {
          const resp = await fetch(url, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newmaxSid),
          });
          const data = await resp.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateMaxSid();
  }, [uniqueid, id]);

  const Createnew = async () => {
    const url = 'http://localhost:8000/maxsId';
    const addurl = 'http://localhost:8000/movies';

    try {
      const resp1 = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const data1 = await resp1.json();
      console.log(data1);

      setunique(data1._id);
      setid(Number(data1.maxid) + 1);

      const newmovie = {
        id: Number(data1.maxid) + 1, // Use the maxid value directly
        name: selectname,
        Genres: [Genres1, Genres2, Genres3],
        ImageUrl: selectImageUrl,
        premiered: Date(selectedDate),
      };

      console.log(newmovie);
      try {
        const resp2 = await fetch(addurl, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newmovie),
        });
        const data2 = await resp2.json();
        console.log(data2);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" placeholder="Enter the name" onChange={handlenameChange} />
      <br />
      <label htmlFor="imageUrl">ImageUrl:</label>
      <input type="text" id="imageUrl" placeholder="Enter the imageUrl" onChange={handleimageChange} />
      <br />
      <label htmlFor="premiered">Premiered:</label>
      <DatePicker
        id="premiered"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />

      <br />
      genres 1:
      <select onChange={handleGenre1Change}>
        {Genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <br />
      genres 2:
      <select onChange={handleGenre2Change}>
        {Genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <br />
      genres 3:
      <select onChange={handleGenre3Change}>
        {Genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {console.log('gen1: ' + Genres1)}
      {console.log('gen2: ' + Genres2)}
      {console.log('gen3: ' + Genres3)}

      <br />
      <button onClick={Createnew}>Create new</button>
    </div>
  );
};

export default Addmovie;
