import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCalendar, FaLightbulb, FaProductHunt, FaStar, FaRegComment, FaThumbsUp } from 'react-icons/fa';

const ProductRecommendations = ({ recommendations }) => {
  const sortedData = [...recommendations].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-2xl border border-blue-100">
          <FaRegComment className="text-blue-500 text-xl" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Community Recommendations
          </h2>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {sortedData.length}
          </span>
        </div>
        <p className="text-gray-600 mt-3 text-sm">
          Expert suggestions from our community members
        </p>
      </motion.div>

      <AnimatePresence>
        {sortedData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="text-blue-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Recommendations Yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Be the first to suggest an alternative product for this query!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {sortedData.map((rec, index) => (
              <motion.div
                key={rec._id}
                variants={itemVariants}
                layout
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Recommender Info & Product Image */}
                    <div className="flex flex-col items-center lg:items-start space-y-4 lg:w-1/4">
                      {/* Recommender Avatar */}
                      <div className="relative">
                        <img
                          src={rec.recommenderPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(rec.recommenderName)}&background=6366f1&color=fff`}
                          alt={rec.recommenderName}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg group-hover:border-blue-200 transition-colors duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>

                      {/* Recommender Details */}
                      <div className="text-center lg:text-left">
                        <p className="font-semibold text-gray-900 text-sm">
                          {rec.recommenderName}
                        </p>
                        <p className="text-gray-500 text-xs truncate max-w-[120px]">
                          {rec.recommenderEmail}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <FaCalendar className="text-gray-400" />
                          <span>{new Date(rec.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation Content */}
                    <div className="flex-1 space-y-4">
                      {/* Recommendation Title */}
                      <div className="flex items-start gap-3">
                        <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {rec.recommendationTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaProductHunt className="text-blue-500" />
                            <span className="font-medium">Recommended Product:</span>
                            <span className="text-gray-900">{rec.recommendedProductName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Product Image */}
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <img
                          src={rec.recommendedProductImage}
                          alt={rec.recommendedProductName}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">
                            {rec.recommendedProductName}
                          </p>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {rec.recommendationTitle}
                          </p>
                        </div>
                      </div>

                      {/* Recommendation Reason */}
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-start gap-3">
                          <FaLightbulb className="text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-sm mb-2">
                              Why this is a great alternative:
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {rec.recommendationReason}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
                            <FaThumbsUp className="text-sm" />
                            <span>Helpful</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-green-600 transition-colors duration-200">
                            <FaRegComment className="text-sm" />
                            <span>Reply</span>
                          </button>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(rec.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More / Stats */}
      {sortedData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center pt-6 border-t border-gray-200"
        >
          <div className="inline-flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
              <span>{new Set(sortedData.map(rec => rec.recommenderEmail)).size} contributors</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegComment className="text-green-500" />
              <span>{sortedData.length} total recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-purple-500" />
              <span>Updated {new Date(sortedData[0]?.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductRecommendations;