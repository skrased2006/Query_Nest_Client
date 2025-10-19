import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typewriter } from 'react-simple-typewriter';
import Loading from '../Loading/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaUser, FaCalendar, FaProductHunt, FaStar, FaRegSmileBeam, FaExternalLinkAlt } from 'react-icons/fa';

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRecs, setFilteredRecs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `https://b11a11-server-side-skrased2006.vercel.app/recommendations-for-me?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setRecommendations(data);
        setFilteredRecs(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = recommendations.filter(rec =>
        rec.myProduct?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.recommendedProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.recommendationReason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.recommenderEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecs(filtered);
    } else {
      setFilteredRecs(recommendations);
    }
  }, [searchTerm, recommendations]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-2xl mb-6">
            <FaLightbulb className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Personalized{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              <Typewriter
                words={['Recommendations', 'Suggestions', 'Expert Tips']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover tailored product suggestions from our community experts based on your queries
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaLightbulb className="text-blue-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
              <div className="text-sm text-gray-600">Total Recommendations</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaUser className="text-green-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(recommendations.map(rec => rec.recommenderEmail)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Recommenders</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaProductHunt className="text-purple-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(recommendations.map(rec => rec.myProduct)).size}
              </div>
              <div className="text-sm text-gray-600">Your Products</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaStar className="text-pink-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(recommendations.map(rec => rec.recommendedProductName)).size}
              </div>
              <div className="text-sm text-gray-600">Suggested Products</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md relative">
              <FaStar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recommendations by product, reason, or recommender..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-purple-600">{filteredRecs.length}</span>
              <span>recommendations found</span>
            </div>
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <AnimatePresence>
          {filteredRecs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaRegSmileBeam className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {searchTerm ? 'No Matching Recommendations' : 'No Recommendations Yet'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {searchTerm 
                  ? `No recommendations found for "${searchTerm}". Try different search terms.`
                  : "You haven't received any recommendations yet. Keep engaging with the community!"
                }
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredRecs.map((rec, index) => (
                <motion.div
                  key={rec._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaLightbulb className="text-yellow-300" />
                        <span className="font-semibold">Recommendation #{index + 1}</span>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {new Date(rec.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Your Product */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaProductHunt className="text-purple-500" />
                        Your Product
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{rec.myProduct}</p>
                    </div>

                    {/* Recommended Product */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaStar className="text-yellow-500" />
                        Recommended Alternative
                      </label>
                      <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
                        <img
                          src={rec.recommendedProductImage}
                          alt={rec.recommendedProductName}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {rec.recommendedProductName}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {rec.recommendationTitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaLightbulb className="text-blue-500" />
                        Why Recommended
                      </label>
                      <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {rec.recommendationReason}
                      </p>
                    </div>

                    {/* Recommender Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-xs" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            {rec.recommenderName || 'Community Member'}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[120px]">
                            {rec.recommenderEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaCalendar className="text-gray-400" />
                        <span>{new Date(rec.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecommendationsForMe;