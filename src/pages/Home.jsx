import React from 'react';
import { motion } from 'framer-motion';
import Slider from './Slider';
import RecentQuery from './RecentQuery/RecentQuery';
import Testimonials from './testimonials';
import ExtraSection from './ExtraSection/ExtraSection';
import Newsletter from './Newsletter/Newsletter';

// Variants for sections
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div className="space-y-20">
      
      {/* Slider / Hero */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <Slider />
      </motion.div>

      {/* Recent Queries */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeLeft}
        transition={{ delay: 0.2 }}
        className="px-4"
      >
        <RecentQuery />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeRight}
        transition={{ delay: 0.3 }}
        className="px-4"
      >
        <Testimonials />
      </motion.div>

      {/* Extra Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeLeft}
        transition={{ delay: 0.4 }}
        className="px-4"
      >
        <ExtraSection />
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ delay: 0.5 }}
        className="px-4"
      >
        <Newsletter />
      </motion.div>
    </div>
  );
};

export default Home;
