import React from 'react';
import { FaRegComment, FaLightbulb, FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const SingleQuery = ({ singleQuery }) => {
  const { _id, productName, productImage, queryTitle, recommendationCount, date, productBrand } = singleQuery;

  const navigate = useNavigate();

  const handleRecommendClick = () => {
    navigate(`/query/${_id}`);
  };

  const handleCardClick = () => {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
    >
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Brand Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <FaTag className="text-blue-500 text-xs" />
            {productBrand}
          </span>
        </div>

        {/* Recommendation Count */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <FaRegComment className="text-xs" />
            {recommendationCount ?? 0}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
          {productName}
        </h3>

        {/* Query Title */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <FaLightbulb className="text-purple-500 mt-1 flex-shrink-0" />
            <p className="text-gray-700 leading-relaxed line-clamp-3 text-sm">
              {queryTitle}
            </p>
          </div>
        </div>

        {/* Date and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaCalendar className="text-gray-400" />
            <span>{formatDate(date)}</span>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleRecommendClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex items-center gap-2"
          >
            <span className="flex items-center gap-2 relative z-10 text-sm">
              <FaLightbulb className="text-sm" />
              Suggest
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default SingleQuery;