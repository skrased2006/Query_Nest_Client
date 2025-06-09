import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Muhammad Umair',
    image: 'https://i.pravatar.cc/100?img=1',
    rating: 5,
    text: 'This website has helped me a lot in my life. Now I can choose the right product by seeing others’ recommendations.',
  },
  {
    name: 'Ayesha Khatun',
    image: 'https://i.pravatar.cc/100?img=2',
    rating: 4,
    text: 'Amazing experience! The product recommendation system is simply excellent. The user interface is very smooth.',
  },
  {
    name: 'Rakib Hasan',
    image: 'https://i.pravatar.cc/100?img=3',
    rating: 5,
    text: 'I have also referred this platform to my friends because it is completely hassle-free and helpful.',
  },
  {
    name: 'Fatima Noor',
    image: 'https://i.pravatar.cc/100?img=4',
    rating: 5,
    text: 'The recommendations here saved me so much time and effort. I always trust this platform for making purchases.',
  },
  {
    name: 'Imran Ali',
    image: 'https://i.pravatar.cc/100?img=5',
    rating: 4,
    text: 'Great tool with reliable product suggestions. It helped me find exactly what I was looking for.',
  },
  {
    name: 'Sadia Rahman',
    image: 'https://i.pravatar.cc/100?img=6',
    rating: 5,
    text: 'User-friendly and efficient. The reviews and recommendations helped me make informed decisions.',
  },
  {
    name: 'Tariq Ahmed',
    image: 'https://i.pravatar.cc/100?img=7',
    rating: 4,
    text: 'A very helpful platform with accurate recommendations. It’s my go-to site for product research.',
  },
  {
    name: 'Nabila Chowdhury',
    image: 'https://i.pravatar.cc/100?img=8',
    rating: 5,
    text: 'I love how easy it is to find trustworthy recommendations here. It’s made shopping so much simpler.',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-10" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center m-10">
        {/* Left: Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.article
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-xl p-8 relative"
            role="region"
            aria-live="polite"
          >
            <blockquote className="text-gray-800 text-lg italic leading-relaxed">
              <span className="text-6xl text-red-600 font-serif select-none" aria-hidden="true">
                “
              </span>
              {current.text}
            </blockquote>
            <footer className="flex items-center mt-8 space-x-5">
              <img
                src={current.image}
                alt={`Photo of ${current.name}`}
                className="w-16 h-16 rounded-full border-2 border-red-600 object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-lg text-gray-900">{current.name}</p>
                <div
                  className="text-yellow-400"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {'★'.repeat(current.rating)}{'☆'.repeat(5 - current.rating)}
                </div>
              </div>
            </footer>

            {/* Slider Dots */}
            <nav
              className="flex mt-10 space-x-3 justify-start"
              aria-label="Select testimonial"
            >
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-4 h-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    idx === currentIndex ? 'bg-red-600' : 'bg-gray-300 hover:bg-red-400'
                  }`}
                  aria-label={`Show testimonial from ${testimonials[idx].name}`}
                  aria-current={idx === currentIndex ? 'true' : 'false'}
                  type="button"
                />
              ))}
            </nav>
          </motion.article>
        </AnimatePresence>

        {/* Right: Success Stories */}
      <aside className="bg-gradient-to-r from-blue-600 via-purple-700 to-red-400 text-white p-12 md:p-16 rounded-2xl shadow-xl flex flex-col justify-center items-center">
  <h2 className="text-4xl font-extrabold mb-4 text-center tracking-wide drop-shadow-md">
    SUCCESS STORIES
  </h2>
  <div className="w-24 h-1 bg-white rounded-full mx-auto mb-8 shadow-lg"></div>
  <p className="italic text-center text-lg max-w-xl leading-relaxed drop-shadow-sm">
    Many people have found the products they needed and been happy using our platform.  
    <br />
    <span className="font-semibold">You could be the next success story!</span>
  </p>
</aside>

      </div>
    </section>
  );
}
