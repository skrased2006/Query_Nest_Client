import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import SingleQuery from './SingleQuery';
import Loading from './Loading/Loading';

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
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-4">
        All Product Queries
      </h2>

      <input
        type="text"
        placeholder="Search by product name..."
        className="border p-2 rounded w-full md:w-1/3 mb-6 block mx-auto"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {filteredData.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((singleQuery) => (
            <SingleQuery key={singleQuery._id} singleQuery={singleQuery} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No matching queries found.
        </p>
      )}
    </div>
  );
};

export default AllQuerys;
