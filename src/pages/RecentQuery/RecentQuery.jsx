import React, { useEffect } from 'react';
import { useState } from 'react';
import RecentSingleQuery from './RecentSingleQuery';
import { Typewriter } from 'react-simple-typewriter';

const RecentQuery = () => {

    const [recentQueries, setRecentQueries] = useState([]);

   useEffect(() => {
    fetch('https://my-query-server.vercel.app/recentQuery')
        .then(res => res.json())
        .then(data => {
            setRecentQueries(data);
        });
}, []);

  



  return (
    <section className="bg-gray-100">
    <div className=" max-w-7xl mx-auto ">
      <h1 className="text-2xl font-bold  text-indigo-600 mb-6 text-center pt-9">
        🔍 
          <Typewriter
              words={[
              ' Recent Queries',
             ]}
             loop={true}
             cursor
             cursorStyle="|"
             typeSpeed={70}
             deleteSpeed={50}
             delaySpeed={1500}
          /> 
      </h1>

      <div className='grid grid-cols-1 gap-4 mt-10 sm:grid-cols-3'>
        {
            recentQueries.map(recentSingleQuery=><RecentSingleQuery 
                recentSingleQuery={recentSingleQuery}
                key={recentSingleQuery._id}
            ></RecentSingleQuery>)
        }
      </div>

    </div>
    </section>
  );
};

export default RecentQuery;
