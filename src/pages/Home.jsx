import React from 'react';
import { motion } from 'framer-motion';
import Slider from './Slider';
import RecentQuery from './RecentQuery/RecentQuery';
import Testimonials from './testimonials';
import ExtraSection from './ExtraSection/ExtraSection';
import Newsletter from './Newsletter/Newsletter';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div className="space-y-16"> {/* Adds equal spacing between sections */}
      
      {/* Slider / Hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Slider />
      </motion.div>

      {/* Recent Queries */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
        className="px-4"
      >
        <RecentQuery />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
        className="px-4"
      >
        <Testimonials />
      </motion.div>

      {/* Extra Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
        className="px-4"
      >
        <ExtraSection />
      </motion.div>

      {/* Newsletter */}
      <div className="px-4">
        <Newsletter />
      </div>

    </div>
  );
};

export default Home;
