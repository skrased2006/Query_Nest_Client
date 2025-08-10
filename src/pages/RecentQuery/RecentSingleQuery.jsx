import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const RecentSingleQuery = ({ recentSingleQuery }) => {
  const {
    _id,
    productBrand,
    productName,
    productImage,
    queryTitle,
    date,
    recommendationCount,
  } = recentSingleQuery;

  const navigate = useNavigate();

  const handleRecommendClick = () => {
    navigate(`/query/${_id}`);
  };

  return (
    <div className="bg-gradient-to-tr from-pink-50 via-purple-50 to-indigo-50 shadow-md rounded-xl p-6 mb-6 transform transition-transform duration-300 hover:shadow-2xl hover:scale-105 border border-transparent hover:border-indigo-300 cursor-pointer">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-40 object-cover mb-5 rounded-lg border border-gray-300"
      />

      <h3 className="text-xl font-semibold text-indigo-800 mb-2">{productName}</h3>
      <p className="text-sm text-indigo-600 mb-1">
        <strong className="text-indigo-700">Brand:</strong> {productBrand}
      </p>
      <p className="text-indigo-700 mb-3 text-sm line-clamp-2">
        <strong className="text-indigo-700">Query:</strong> {queryTitle}
      </p>
      <p className="text-xs text-indigo-400 mb-4 italic">
        {new Date(date).toLocaleString()}
      </p>

      <div className="flex justify-between items-center text-indigo-600">
        <div className="flex items-center gap-2 text-sm">
          <FaRegComment className="text-indigo-400" />
          <span className="font-medium text-indigo-700">{recommendationCount ?? 0}</span>
        </div>

        <button
          onClick={handleRecommendClick}
          className="bg-indigo-600 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md transition-colors duration-300 cursor-pointer"
          aria-label={`View recommendations for ${productName}`}
        >
          Recommend
        </button>
      </div>
    </div>
  );
};

export default RecentSingleQuery;
