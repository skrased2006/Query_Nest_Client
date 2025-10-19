import React, { useEffect, useState } from 'react';
import RecentSingleQuery from './RecentSingleQuery';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const RecentQuery = () => {
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://b11a11-server-side-skrased2006.vercel.app/recentQuery')
      .then(res => res.json())
      .then(data => {
        setRecentQueries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recent queries:', error);
        setLoading(false);
      });
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              <Typewriter
                words={['Community Queries', 'Technical Questions', 'Expert Discussions']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore recent technical questions from our community and share your expertise
          </p>
        </motion.div>

        {/* Queries Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {recentQueries.map((query, index) => (
            <motion.div
              key={query._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <RecentSingleQuery recentSingleQuery={query} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {recentQueries.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Queries Yet</h3>
            <p className="text-gray-500">Be the first to start a discussion!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentQuery;