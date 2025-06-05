import React from 'react';
import { useNavigate } from 'react-router'; // ✅ use correct package

const SingleQuery = ({ singleQuery }) => {
  const { _id, productName, productImage, queryTitle, recommendationCount,date } = singleQuery;

  const navigate = useNavigate();

  const handleRecommendClick = () => {
    navigate(`/query/${_id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-5 hover:shadow-lg transition-shadow">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-32 object-cover mb-4 rounded"
      />

      <h3 className="text-lg font-semibold text-green-700 mb-1">{productName}</h3>
      <p className="text-gray-700 mb-2 text-sm line-clamp-2">{queryTitle}</p>
      <p className="text-xs text-gray-400 mb-3">Date: {new Date(date).toLocaleString()}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <p>Recommendations: {recommendationCount}</p>
        <div className="text-center">
        <button
          onClick={handleRecommendClick}
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
        >
          Recommend
        </button>
      </div>
      </div>

      
    </div>
  );
};

export default SingleQuery;
