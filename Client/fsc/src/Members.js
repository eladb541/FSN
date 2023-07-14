import React, { useEffect, useState } from 'react';
import Member from './Member';
import './Members.css';


import { Link } from 'react-router-dom';

export const Members = () => {
  const [allmembers, setallmembers] = useState([]);
  const [showmembers, setshowmembers] = useState([]);
  const [search, setSearch] = useState("");
  const [allsubscribes, setAllSubscribes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = 'http://localhost:8000/members';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setallmembers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchDatachange() {
      const url = 'http://localhost:8000/members';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setallmembers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDatachange();
  }, [allmembers]);



  useEffect(() => {
    setshowmembers(allmembers);
  }, [allmembers]);

  useEffect(() => {
    if (search !== "") {
      const filteredmembers = allmembers.filter((member) =>
      member.name.toLowerCase().includes(search.toLowerCase())
      );
      setshowmembers(filteredmembers);
    } else {
      setshowmembers(allmembers);
    }
  }, [search, allmembers]);




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
  }, []);











  return (
    <div>
     <br/>
     <br/>
      <div className="fixed-container">
        <input
          type="text"
          className="fixed-search"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
   
      <div className="members-container">
      {showmembers.map((member) => (
  <Member key={member._id} member={member} allsubscribes={allsubscribes} />
))}

      </div>
      
   
      
      <div>
        <Link to="/addmember">
          <button className="add-member-button">Add New Member</button>
        </Link>
      </div>
    </div>
  );
};

export default Members;
