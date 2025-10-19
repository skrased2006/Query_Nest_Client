import React from 'react';
import { FaRegComment, FaArrowRight, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-5">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 flex-1">
            {productName}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {productBrand}
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {queryTitle}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaLightbulb className="text-yellow-500" />
              <span className="font-medium text-gray-700">{recommendationCount ?? 0}</span>
              <span className="hidden sm:inline">Suggestions</span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {formatDate(date)}
            </span>
          </div>

          <motion.button
            onClick={handleRecommendClick}
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2 relative z-10">
              <FaRegComment className="text-sm" />
              Suggest
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentSingleQuery;