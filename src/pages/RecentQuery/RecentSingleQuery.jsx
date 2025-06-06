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
        recommendationCount,  // নিশ্চিত করো তোমার ডাটাতে আছে
    } = recentSingleQuery;

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
             <p className="text-sm text-gray-500 mb-1"><strong>Brand: </strong>     {productBrand}</p>
            <p className="text-gray-700 mb-2 text-sm line-clamp-2"><strong>Query :</strong> {queryTitle}</p>
           <p className="text-xs text-gray-400 mb-3">Date: {new Date(date).toLocaleString()}</p>

            <div className="flex justify-between items-center text-gray-600 mb-4">
    {/* Comment count with icon */}
      <div className="flex items-center gap-1 text-sm">
      <FaRegComment className="text-blue-600" />
      <span>{recommendationCount ?? 0}</span>
   </div>
   
  {/* Recommend button */}
   <button
    onClick={handleRecommendClick}
    className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
  >
    Recommend
  </button>
</div>

        </div>
    );
};

export default RecentSingleQuery;
