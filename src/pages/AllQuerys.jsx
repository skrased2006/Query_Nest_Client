import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import SingleQuery from './SingleQuery';
import Loading from './Loading/Loading';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';

const AllQuerys = () => {
  const data = useLoaderData();
  console.log("all query",data);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [columns, setColumns] = useState(3); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredData = sortedData.filter((item) =>
    item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Fade cascade damping={0.3}>
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-4">
          <Typewriter
            words={[' All Product Queries']}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </Fade>

      <Slide direction="down" duration={800}>
        <input
          type="text"
          placeholder="Search by product name..."
          className="border p-2 rounded w-full md:w-1/3 mb-6 block mx-auto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Slide>

      {/* Grid layout toggle buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {[2, 3, 4].map((col) => (
          <button
            key={col}
            onClick={() => setColumns(col)}
            className={`px-4 py-2 rounded ${columns === col ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {col} Col
          </button>
        ))}
      </div>

      {filteredData.length > 0 ? (
        <div className={`grid gap-6 ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {filteredData.map((singleQuery, index) => (
            <Zoom triggerOnce delay={index * 100} key={singleQuery._id}>
              <SingleQuery singleQuery={singleQuery} />
            </Zoom>
          ))}
        </div>
      ) : (
        <Fade>
          <p className="text-center text-gray-500 text-lg">
            No matching queries found.
          </p>
        </Fade>
      )}
    </div>
  );
};

export default AllQuerys;
