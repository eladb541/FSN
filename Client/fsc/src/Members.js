import React, { useEffect, useState } from 'react';
import Member from './Member';
import './Members.css';


import { Link } from 'react-router-dom';

export const Members = () => {
  const [allmembers, setallmembers] = useState([]);
  const [showmembers, setshowmembers] = useState([]);
  const [search, setSearch] = useState("");
  const [allsubscribes, setAllSubscribes] = useState([]);
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[creatMo,screatMo]=useState(false)
  const[deleteMo,sdeleteMo]=useState(false)
  const[updateMo,supdateMo]=useState(false)
  const[viewMo,sviewMo]=useState(false)




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
            
            const newurl = 'http://localhost:8000/decoder/members';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log("per")
            console.log(data)
            if (data) {
              screatMo(data.creatM)
          sdeleteMo(data.deleteM)
          supdateMo(data.updateM)
          sviewMo(data.viewM)
    
    
    
    
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
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
   {viewMo&& (
      <div className="members-container">

      {showmembers.map((member) => (
  <Member key={member._id} member={member} allsubscribes={allsubscribes}  updatevar={updateMo} deletevar={deleteMo}/>
))}

      </div>
      )}
   
      {creatMo&&(
      <div>
        <Link to="/addmember">
          <button className="add-member-button">Add New Member</button>
        </Link>
      </div>
)}


    </div>
  );
};

export default Members;
