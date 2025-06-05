import React, { useEffect } from 'react';
import { useState } from 'react';
import RecentSingleQuery from './RecentSingleQuery';

const RecentQuery = () => {

    const [recentQueries, setRecentQueries] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/recentQuery')
        .then(res=>res.json())
        .then(data=>{
            setRecentQueries(data);
        })
    },[])
  



  return (
    <div className="mt-10 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold  text-indigo-600 mb-6 text-center">
        🔍 Recent Queries
      </h1>

      <div className='grid grid-cols-3 gap-4'>
        {
            recentQueries.map(recentSingleQuery=><RecentSingleQuery 
                recentSingleQuery={recentSingleQuery}
                key={recentSingleQuery._id}
            ></RecentSingleQuery>)
        }
      </div>

    </div>
  );
};

export default RecentQuery;
