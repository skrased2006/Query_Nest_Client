import React from 'react';
import { motion } from 'framer-motion';
import Slider from './Slider';
import RecentQuery from './RecentQuery/RecentQuery';
import Testimonials from './testimonials';
import ExtraSection from './ExtraSection/ExtraSection';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Slider />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
      >
        <RecentQuery />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <Testimonials />
      </motion.div>
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <ExtraSection/>
      </motion.div>
    </div>
  );
};

export default Home;
