import React, { useEffect, useState } from 'react';
import MySu from './MySu';
import './MySus.css';
import { Link } from 'react-router-dom';



export const MySubscribes = () =>  {
  const [allsubscribes, setAllSubscribes] = useState([]);
  const [showsubscribes, setShowSubscribes] = useState([]);
  const [search, setSearch] = useState('');
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[subcreate,screatMo]=useState(false)
  const[subdelete,sdeleteMo]=useState(false)
  const[subupdate,supdateMo]=useState(false)
  const[subview,sviewMo]=useState(false)

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
            
            const newurl = 'http://localhost:8000/decoder/subscribes';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log("per")
            console.log(data)
            if (data) {
              screatMo(data.subC)
              sdeleteMo(data.subD)
              supdateMo(data.subU)
              sviewMo(data.subV)
    
    
    
    
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
            {subupdate && ( <th>Update</th>)}
           {subdelete&&(<th>Delete</th>)} 
          </tr>
          {subview&&(<div>
             {showsubscribes.map((subscribe) => (
              <MySu
                key={subscribe._id}
                subscribe={subscribe}
                updatevar={subupdate} deletevar={subdelete}
              />
               ))}
               </div>)}
             
        </tbody>
      </table>
{subcreate&&(<div>
        <Link to="/addsubscribe">
          <button className="add-member-button">Add New Subscribe</button>
        </Link>
      </div>)}
      
    </div>
  );
};


export default MySubscribes;
