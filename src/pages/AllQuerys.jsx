import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import SingleQuery from './SingleQuery';
import Loading from './Loading/Loading';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';

const AllQuerys = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

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

      {filteredData.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
