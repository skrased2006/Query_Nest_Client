import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MySingleQuery from './MySingleQuery';
import Loading from '../Loading/Loading';
import { Link } from 'react-router';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import axios from 'axios';

const MyQuery = () => {
  const { user } = useContext(AuthContext);
  const [myQuery, setMyQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
   axios(`http://localhost:3000/queries/email/${user.email}`, {
  headers: {
    authorization: `Bearer ${user.accessToken}`
  }
})
  .then((response) => {
    setMyQuery(response.data);
  });

    }
  }, [user?.email, user?.accessToken]);

  const sortedData = [...myQuery].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleDelete = (deletedId) => {
    const updated = myQuery.filter((query) => query._id !== deletedId);
    setMyQuery(updated);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl mx-auto py-8 px-4'>
     
      <Slide direction="down" triggerOnce>
        <div className="bg-indigo-100 rounded-lg p-6 mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Your Private Queries</h1>
          <p className="text-gray-600 mb-4">Manage all your submitted queries in one place.</p>
          <Link to="/addQuery">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
              ➕ Add Query
            </button>
          </Link>
        </div>
      </Slide>

      
      {sortedData.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((mySingleQuery, index) => (
            <Zoom delay={index * 100} triggerOnce key={mySingleQuery._id}>
              <MySingleQuery
                mySingleQuery={mySingleQuery}
                onDelete={handleDelete}
              />
            </Zoom>
          ))}
        </div>
      ) : (
        <Fade triggerOnce>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg mb-4"> No queries found.</p>
            <Link to="/addQuery">
              <button className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition">
                ➕ Add Your First Query
              </button>
            </Link>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default MyQuery;
