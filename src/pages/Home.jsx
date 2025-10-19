import React from 'react';
import { motion } from 'framer-motion';
import Slider from './Slider';
import RecentQuery from './RecentQuery/RecentQuery';
import Testimonials from './testimonials';
import ExtraSection from './ExtraSection/ExtraSection';
import Newsletter from './Newsletter/Newsletter';

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2
    } 
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2 
    } 
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3 
    } 
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.34, 1.56, 0.64, 1] 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>

      <motion.div 
        className="space-y-32 lg:space-y-40"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Hero Slider Section */}
        <motion.section
          variants={fadeUp}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/80 -z-10"></div>
          <Slider />
        </motion.section>

        {/* Recent Queries Section */}
        <motion.section
          variants={fadeLeft}
          className="relative"
        >
          <div className="absolute -left-20 top-1/2 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
          <RecentQuery />
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          variants={fadeRight}
          className="relative"
        >
          <div className="absolute -right-20 top-1/3 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
          <Testimonials />
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={scaleIn}
          className="relative"
        >
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-60 h-60 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
          <ExtraSection />
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          variants={fadeUp}
          className="relative"
        >
          <div className="absolute -left-10 bottom-10 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
          <div className="absolute -right-10 top-10 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
          <Newsletter />
        </motion.section>

        {/* CTA Footer */}
        <motion.section
          variants={fadeUp}
          className="relative py-20"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Product Decisions?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of smart shoppers making better choices with community-driven recommendations
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300"
                >
                  Browse Products
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      {/* Floating Background Shapes */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-8 h-8 bg-blue-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-20 w-6 h-6 bg-purple-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-1/4 w-4 h-4 bg-indigo-300 rounded-full opacity-20"
        />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{
          scaleX: 0,
          transformOrigin: "0%"
        }}
        whileInView={{
          scaleX: 1,
          transition: {
            duration: 2,
            ease: "easeInOut"
          }
        }}
        viewport={{ once: false }}
      />
    </div>
  );
};

export default Home;