import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Typewriter } from 'react-simple-typewriter';
import Loading from '../Loading/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEye, FaStar, FaUser, FaCalendar, FaProductHunt, FaLightbulb, FaRegComment, FaSearch, FaChartLine } from 'react-icons/fa';

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecs, setFilteredRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Small loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Fetch recommendations
  useEffect(() => {
    if (user?.email) {
      fetch(`https://b11a11-server-side-skrased2006.vercel.app/my-recommendations?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data);
          setFilteredRecs(data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user?.email, user?.accessToken]);

  // Filter recommendations
  useEffect(() => {
    if (searchTerm) {
      const filtered = recommendations.filter(rec =>
        rec.recommendedProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.recommendationReason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.queryTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecs(filtered);
    } else {
      setFilteredRecs(recommendations);
    }
  }, [searchTerm, recommendations]);

  // Handle delete
  const handleDelete = async (id, productName) => {
    const confirm = await Swal.fire({
      title: 'Delete Recommendation?',
      text: `This will permanently delete your recommendation for "${productName}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: 'white',
      customClass: {
        popup: 'rounded-2xl'
      }
    });

    if (confirm.isConfirmed) {
      fetch(`https://b11a11-server-side-skrased2006.vercel.app/my-recommendations/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
            setFilteredRecs((prev) => prev.filter((rec) => rec._id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Your recommendation has been permanently deleted.',
              icon: 'success',
              confirmButtonColor: '#10b981',
              background: '#1f2937',
              color: 'white',
              customClass: {
                popup: 'rounded-2xl'
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the recommendation.',
              icon: 'error',
              confirmButtonColor: '#ef4444',
              background: '#1f2937',
              color: 'white',
              customClass: {
                popup: 'rounded-2xl'
              }
            });
          }
        })
        .catch((err) => {
          console.error('Delete error:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: '#1f2937',
            color: 'white',
            customClass: {
              popup: 'rounded-2xl'
            }
          });
        });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl shadow-2xl mb-6">
            <FaRegComment className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              <Typewriter
                words={['Recommendations', 'Contributions', 'Expert Suggestions']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage all the recommendations you've shared with the community
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
                <FaRegComment className="text-blue-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
              <div className="text-sm text-gray-600">Total Recommendations</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaProductHunt className="text-green-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(recommendations.map(rec => rec.recommendedProductName)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Products</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaLightbulb className="text-purple-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(recommendations.map(rec => rec.queryTitle)).size}
              </div>
              <div className="text-sm text-gray-600">Queries Helped</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(recommendations.length / 7)}/week
              </div>
              <div className="text-sm text-gray-600">Average Rate</div>
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
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your recommendations by product, reason, or query..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-orange-600">{filteredRecs.length}</span>
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
                <FaRegComment className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {searchTerm ? 'No Matching Recommendations' : 'No Recommendations Yet'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {searchTerm 
                  ? `No recommendations found for "${searchTerm}". Try different search terms.`
                  : "You haven't shared any recommendations yet. Start helping the community by suggesting alternatives!"
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
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-300" />
                        <span className="font-semibold">Recommendation #{index + 1}</span>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {new Date(rec.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Recommended Product */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaProductHunt className="text-orange-500" />
                        Recommended Product
                      </label>
                      <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
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

                    {/* Query Info */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaLightbulb className="text-blue-500" />
                        For Query
                      </label>
                      <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {rec.queryTitle}
                      </p>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaRegComment className="text-green-500" />
                        Your Reasoning
                      </label>
                      <p className="text-gray-700 text-sm leading-relaxed bg-green-50 p-3 rounded-lg border border-green-200">
                        {rec.recommendationReason}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCalendar className="text-gray-400" />
                        <span>{new Date(rec.timestamp).toLocaleDateString()}</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(rec._id, rec.recommendedProductName)}
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center gap-2 text-sm"
                      >
                        <FaTrash className="text-xs" />
                        Delete
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyRecommendation;