import React from 'react';
import { useLoaderData } from 'react-router'; // ✅ ঠিক করা হয়েছে import
import SingleQuery from './SingleQuery';

const AllQuerys = () => {
  const data = useLoaderData();

  // Descending order এ sort করা (নতুন আগে)
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
        All Product Queries
      </h2>

      {/* Check if data exists */}
      {sortedData?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((singleQuery) => (
            <SingleQuery key={singleQuery._id} singleQuery={singleQuery} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No queries found.</p>
      )}
    </div>
  );
};

export default AllQuerys;
