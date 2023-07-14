


export const MemberSub = ({ mysubscribe }) => {
  



  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='member-container'>
      {mysubscribe.map((sub) => (
        <div key={sub._id}>
          <p>Date: {formatDate(sub.datemovie)}</p>
          <p>Moviename: {sub.moviename}</p>
        </div>
      ))}
    </div>
  );
};
