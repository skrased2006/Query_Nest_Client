import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import SingleQuery from './SingleQuery';
import Loading from './Loading/Loading';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaTh, FaThLarge, FaThList, FaFilter, FaExclamationCircle } from 'react-icons/fa';

const AllQuerys = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [columns, setColumns] = useState(3);
  const [sortBy, setSortBy] = useState('date');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Sort data based on selected criteria
  const sortedData = [...data].sort((a, b) => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Fade cascade damping={0.2} triggerOnce>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaSearch className="text-white text-lg" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                <Typewriter
                  words={['Community Queries', 'Product Questions', 'Expert Discussions']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover product queries from our community and share your expertise with valuable recommendations
            </p>
          </div>
        </Fade>

        {/* Search and Controls Section */}
        <Slide direction="down" duration={800} triggerOnce>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="flex-1 w-full lg:max-w-md relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product, brand, or query..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-3 items-center">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                  >
                    <option value="date">Newest First</option>
                    <option value="name">Product Name</option>
                    <option value="recommendation">Most Recommended</option>
                  </select>
                  <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Layout Controls */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  {[
                    { cols: 2, icon: FaThList },
                    { cols: 3, icon: FaThLarge },
                    { cols: 4, icon: FaTh }
                  ].map(({ cols, icon: Icon }) => (
                    <button
                      key={cols}
                      onClick={() => setColumns(cols)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        columns === cols
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="text-lg" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-indigo-600">{filteredData.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{data.length}</span> queries
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
          </div>
        </Slide>

        {/* Queries Grid */}
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-6 ${
                columns === 2 ? 'grid-cols-1 lg:grid-cols-2' : 
                columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredData.map((singleQuery, index) => (
                <Zoom 
                  key={singleQuery._id} 
                  triggerOnce 
                  delay={index * 100}
                  duration={500}
                >
                  <SingleQuery singleQuery={singleQuery} />
                </Zoom>
              ))}
            </motion.div>
          ) : (
            <Fade triggerOnce duration={600}>
              <motion.div 
                className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaExclamationCircle className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Queries Found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {searchText 
                    ? `No results found for "${searchText}". Try adjusting your search terms.`
                    : 'There are no queries available at the moment.'
                  }
                </p>
                {searchText && (
                  <button
                    onClick={() => setSearchText('')}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            </Fade>
          )}
        </AnimatePresence>

        {/* Load More Section (Optional) */}
        {filteredData.length > 0 && filteredData.length >= 12 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              Load More Queries
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllQuerys;

