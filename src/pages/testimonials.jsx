import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaStar, FaQuoteLeft, FaRegSmileBeam } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Muhammad Umair',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    role: 'Software Engineer',
    text: 'This website has helped me a lot in my life. Now I can choose the right product by seeing others’ recommendations.',
  },
  {
    name: 'Ayesha Khatun',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    role: 'Product Manager',
    text: 'Amazing experience! The product recommendation system is simply excellent. The user interface is very smooth.',
  },
  {
    name: 'Rakib Hasan',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    role: 'UX Designer',
    text: 'I have also referred this platform to my friends because it is completely hassle-free and helpful.',
  },
  {
    name: 'Fatima Noor',
    image: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    role: 'Data Scientist',
    text: 'The recommendations here saved me so much time and effort. I always trust this platform for making purchases.',
  },
  {
    name: 'Imran Ali',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    role: 'Tech Lead',
    text: 'Great tool with reliable product suggestions. It helped me find exactly what I was looking for.',
  },
  {
    name: 'Sadia Rahman',
    image: 'https://i.pravatar.cc/150?img=6',
    rating: 5,
    role: 'Frontend Developer',
    text: 'User-friendly and efficient. The reviews and recommendations helped me make informed decisions.',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const current = testimonials[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              <Typewriter
                words={['Developers', 'Designers', 'Professionals', 'Everyone']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who found their perfect solutions through community-driven recommendations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative z-10 border border-gray-100">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaQuoteLeft className="text-white text-2xl" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < current.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-medium">
                    "{current.text}"
                  </blockquote>

                  {/* User Info */}
                  <footer className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={current.image}
                        alt={`Photo of ${current.name}`}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{current.name}</p>
                      <p className="text-gray-500 text-sm">{current.role}</p>
                    </div>
                  </footer>
                </div>

                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-2 scale-105 opacity-10 z-0"></div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex space-x-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      idx === currentIndex
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Show testimonial from ${testimonials[idx].name}`}
                    aria-current={idx === currentIndex ? 'true' : 'false'}
                    type="button"
                  />
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Stats */}
          <motion.div 
            className="bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm">
                <FaRegSmileBeam className="text-3xl text-white" />
              </div>
              
              <h3 className="text-4xl font-bold mb-6 tracking-tight">
                <Typewriter
                  words={['Success Stories', 'Happy Users', 'Trusted Reviews', 'Real Results']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h3>
              
              <div className="w-16 h-1 bg-white/60 rounded-full mx-auto mb-8"></div>

              <p className="text-xl leading-relaxed mb-8 text-white/90 font-medium">
                Join our community of professionals who have transformed their decision-making process with trusted recommendations
              </p>

              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10K+</div>
                  <div className="text-white/80 text-sm">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-white/80 text-sm">Satisfaction Rate</div>
                </div>
              </div>

              <motion.div 
                className="mt-8 inline-flex items-center gap-2 text-white/80 text-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>⭐</span>
                <span>Rated 4.8/5 by our community</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}