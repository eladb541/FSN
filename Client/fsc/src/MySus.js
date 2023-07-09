import React, { useEffect, useState } from 'react';
import MySu from './MySu';
import './MySus.css';
import { Link } from 'react-router-dom';



export const MySubscribes = () =>  {
  const [allsubscribes, setAllSubscribes] = useState([]);
  const [showsubscribes, setShowSubscribes] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setShowSubscribes(allsubscribes);
  }, [allsubscribes]);

  useEffect(() => {
    if (search !== '') {
      const filteredSubscribes = allsubscribes.filter(
        (subscribe) =>
          subscribe.membername.toLowerCase().includes(search.toLowerCase()) ||
          subscribe.moviename.toLowerCase().includes(search.toLowerCase())
      );
      setShowSubscribes(filteredSubscribes);
    } else {
      setShowSubscribes(allsubscribes);
    }
  }, [search, allsubscribes]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/subscribes';
    try {
      const resp = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await resp.json();
      setAllSubscribes(data);
    
    } catch (error) {
      console.error(error);
     
    }
  };

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



  return (
    <div>
      <div className="title-container">
       
        <div className="fixed-container">
          <input
            type="text"
            className="fixed-search"
            placeholder="Search by Movie or Member"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="members-container">
        <tbody>
          <tr>
            <th>Name of the subscriber</th>
            <th>ID of member</th>
            <th>Name of the movie</th>
            <th>ID of the movie</th>
            <th>Date of viewing</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {showsubscribes.map((subscribe) => (
            <MySu
              key={subscribe._id}
              subscribe={subscribe}
             
            />
          ))}
        </tbody>
      </table>

      <div>
        <Link to="/addsubscribe">
          <button className="add-member-button">Add New Subscribe</button>
        </Link>
      </div>
    </div>
  );
};


export default MySubscribes;
