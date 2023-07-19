// Member.js
import React, { useState, useEffect } from 'react';
import { Update_M } from './Update_M';
import './Member.css';
import MemberSub from './MemberSub';

const Member = ({ member, updatevar, deletevar, allsubscribes }) => {
  const [showO, setShowO] = useState(true);
  const [showup, setSup] = useState(false);
  const [showmore, setshowmore] = useState(false);
  const [moreteext, setshowtext] = useState('showmore');
  const [mysub, setmysub] = useState([]);

  useEffect(() => {
    const filteredSubscriptions = allsubscribes.filter(sub => sub.memberid === member._id);
    setmysub(filteredSubscriptions);
  }, [allsubscribes, member]);

  const open = () => {
    setShowO(!showO);
    setSup(!showup);
  };

  const showmorefun = () => {
    setshowmore(!showmore);
    if (!showmore) {
      setshowtext('showless');
    } else {
      setshowtext('showmore');
    }
  };

  const change = () => {
    setShowO(!showO);
    setSup(!showup);
  };

  const deleteM = async () => {
    const addUrl = 'http://localhost:8000/members';
    const params = {
      _id: member._id,
    };

    console.log(params);
    try {
      const response = await fetch(addUrl, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='member-container'>
        {showO && (
          <div>
            <h2>{member.name}</h2>
            <p>Email: {member.email}</p>
            <p>City: {member.city}</p>
            <button className='update-button' onClick={showmorefun}>
              {moreteext}
            </button>
          </div>
        )}

        <div>
          {showO && updatevar && (
            <div>
              <button className='update-button' onClick={open}>
                Update
              </button>
            </div>
          )}
        </div>

        <div>
          {showO && deletevar && (
            <div>
              <button className='delete-button' onClick={deleteM}>
                Delete
              </button>
            </div>
          )}
        </div>

        {showmore && (
          <div>
            <MemberSub mysubscribe={mysub} onCancel={showmorefun} />
          </div>
        )}
      </div>

      {showup && (
        <div>
          <Update_M member={member} onCancel={change} updatevar={updatevar} deletevar={deletevar} />
        </div>
      )}
    </div>
  );
};

export default Member;
