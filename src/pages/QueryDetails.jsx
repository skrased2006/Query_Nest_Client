import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import ProductRecommendations from './AllRecomondation/AllRecommendation';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCalendar, FaLightbulb, FaPaperPlane, FaStar, FaRegComments } from 'react-icons/fa';

const QueryDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const singleQuery = useLoaderData();
  const [recommendations, setRecommendations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (singleQuery?._id) {
      fetch(`https://b11a11-server-side-skrased2006.vercel.app/recommendation/${singleQuery._id}`)
        .then(res => res.json())
        .then(data => setRecommendations(data))
        .catch(err => console.error(err));
    }
  }, [singleQuery?._id]);

  const handleRecommend = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form).entries());

    const recommendation = {
      ...formData,
      queryId: singleQuery._id,
      recommendedProductId: singleQuery._id,
      queryTitle: singleQuery.queryTitle,
      userEmail: singleQuery.userEmail,
      userName: singleQuery.userName,
      myProduct: singleQuery.productName,
      timestamp: new Date().toISOString(),
      recommenderEmail: user.email,
      recommenderName: user.name,
      recommenderPhoto: user.userPhoto,
    };

    try {
      const res = await axios.post('https://b11a11-server-side-skrased2006.vercel.app/recommendation', recommendation);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Recommendation Added!',
          text: 'Your suggestion has been shared successfully',
          showConfirmButton: false,
          timer: 2000,
          background: '#1f2937',
          color: 'white',
        });
        form.reset();
        setRecommendations(prev => [...prev, recommendation]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Please try again later',
        background: '#1f2937',
        color: 'white',
        confirmButtonColor: '#3b82f6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-6 lg:p-8">
            
            {/* Left Column - Query Details & Form */}
            <div className="space-y-8">
              {/* Query Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={singleQuery.productImage}
                      alt={singleQuery.productName}
                      className="w-full lg:w-48 h-48 object-cover rounded-2xl shadow-lg border border-gray-200"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {singleQuery.productName}
                      </h1>
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaStar className="text-yellow-500" />
                        Brand: {singleQuery.productBrand}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <FaLightbulb className="text-purple-500" />
                          Query Details
                        </h3>
                        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-xl border border-gray-200">
                          {singleQuery.queryTitle}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <FaLightbulb className="text-red-500" />
                          Boycott Reason
                        </h3>
                        <p className="text-gray-600 leading-relaxed bg-red-50 p-4 rounded-xl border border-red-100">
                          {singleQuery.boycottReason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-200"
                >
                  <div className="relative">
                    <img
                      src={singleQuery?.userPhoto}
                      alt={singleQuery.userName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{singleQuery.userName}</p>
                    <p className="text-sm text-gray-500">{singleQuery.userEmail}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <FaCalendar className="text-gray-400" />
                      {new Date(singleQuery.date).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Recommendation Form */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FaPaperPlane className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Share Your Recommendation</h3>
                    <p className="text-sm text-gray-600">Help others by suggesting alternatives</p>
                  </div>
                </div>

                <form onSubmit={handleRecommend} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recommendation Title *
                      </label>
                      <input
                        type="text"
                        name="recommendationTitle"
                        placeholder="e.g., Great Alternative Product"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="recommendedProductName"
                        placeholder="Enter product name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image URL *
                    </label>
                    <input
                      type="url"
                      name="recommendedProductImage"
                      placeholder="https://example.com/image.jpg"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you recommend this? *
                    </label>
                    <textarea
                      name="recommendationReason"
                      placeholder="Share your experience and why this is a good alternative..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        <span>Submit Recommendation</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.section>
            </div>

            {/* Right Column - Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200 h-[calc(100vh-200px)] flex flex-col"
            >
              {/* Recommendations Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <FaRegComments className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Community Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    {recommendations.length} suggestions from experts
                  </p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recommendations.length}
                </div>
              </div>

              {/* Recommendations List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {recommendations.length > 0 ? (
                    <ProductRecommendations recommendations={recommendations} />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaLightbulb className="text-3xl text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">
                        No Recommendations Yet
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Be the first to suggest an alternative product
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default QueryDetails;