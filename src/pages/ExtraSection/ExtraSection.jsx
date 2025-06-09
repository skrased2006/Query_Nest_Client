import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🚀',
    title: 'Fast & Reliable',
    description: 'Get answers quickly with our lightning-fast platform.',
  },
  {
    icon: '💡',
    title: 'Expert Suggestions',
    description: 'Recommendations from verified professionals.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data and questions are always safe with us.',
  },
  {
    icon: '🌟',
    title: 'Community Driven',
    description: 'Join a thriving community eager to help.',
  },
];

const ExtraSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-500 py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Why Choose Us?
        </h2>
        <p className="text-lg max-w-xl mx-auto drop-shadow-md">
          We provide the best platform to get your queries answered with accuracy and speed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map(({ icon, title, description }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white bg-opacity-20 rounded-xl p-6 cursor-pointer"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-sm text-black">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExtraSection;
