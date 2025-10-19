import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MySingleQuery from './MySingleQuery';
import Loading from '../Loading/Loading';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaQuestionCircle, FaUserTie } from 'react-icons/fa';
import axios from 'axios';

const MyQuery = () => {
  const { user } = useContext(AuthContext);
  const [myQuery, setMyQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios(`https://b11a11-server-side-skrased2006.vercel.app/queries/email/${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      }).then((response) => {
        setMyQuery(response.data);
      });
    }
  }, [user?.email, user?.accessToken]);

  // Sort data based on selected criteria
  const sortedData = [...myQuery].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'name') {
      return a.productName.localeCompare(b.productName);
    } else if (sortBy === 'recommendation') {
      return (b.recommendationCount ?? 0) - (a.recommendationCount ?? 0);
    }
    return 0;
  });

  // Filter data based on search text
  const filteredData = sortedData.filter((item) =>
    item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.productBrand.toLowerCase().includes(searchText.toLowerCase()) ||
    item.queryTitle.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (deletedId) => {
    const updated = myQuery.filter((query) => query._id !== deletedId);
    setMyQuery(updated);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
            <FaUserTie className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Product Queries
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage and track all your submitted product queries in one place
          </p>
        </motion.div>

        {/* Stats and Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.displayName}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <FaQuestionCircle className="text-indigo-500" />
                  <span>{myQuery.length} queries submitted</span>
                </div>
              </div>
            </div>

            {/* Add Query Button */}
            <Link to="/addQuery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <FaPlus className="text-sm" />
                Add New Query
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full lg:max-w-md relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your queries..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <FaFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="date">Newest First</option>
                <option value="name">Product Name</option>
                <option value="recommendation">Most Recommended</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-indigo-600">{filteredData.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{myQuery.length}</span> queries
            </p>
            
            {searchText && (
              <button
                onClick={() => setSearchText('')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        </motion.div>

        {/* Queries Grid */}
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredData.map((mySingleQuery, index) => (
                <motion.div
                  key={mySingleQuery._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <MySingleQuery
                    mySingleQuery={mySingleQuery}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaQuestionCircle className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {searchText ? 'No Matching Queries' : 'No Queries Yet'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {searchText 
                  ? `No results found for "${searchText}". Try adjusting your search terms.`
                  : "You haven't submitted any queries yet. Start by sharing your first product question with the community."
                }
              </p>
              <Link to="/addQuery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200 shadow-lg"
                >
                  <FaPlus className="inline mr-2" />
                  Add Your First Query
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyQuery;