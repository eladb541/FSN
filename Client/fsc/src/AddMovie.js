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
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[isadmin,setisadmin]=useState(false)

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
            
            const newurl = 'http://localhost:8000/decoder/addmovie';
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
      {isadmin&&(
      <div>
       <br/>
      <br/>
      <br/>
      <br/>
      <br/>
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
      </div>)}
    </div>
  );
};

export default Addmovie;
