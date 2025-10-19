import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Slider = () => {
  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative rounded-xl overflow-hidden shadow-2xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white opacity-80 hover:opacity-100 transition-opacity duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        effect="fade"
        speed={1000}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/nq4MTpLz/Sk-Rased-A-thoughtful-young-person-sitting-at-a-desk-with-a-c8ec6365-7092-4454-a541-926b4631abca.png')",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            
            <div className="hero-content text-center text-white relative z-10">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Got a Problem? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Just Ask!
                  </span>
                </motion.h1>
                <motion.p 
                  className="mb-8 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Connect with experts and get solutions to your technical challenges
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link to="/addQuery">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg">
                      Get Started Now
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/TMz6wrjW/Sk-Rased-A-confident-young-adult-explaining-something-to-ot-fdc7f972-c220-478e-ba7c-ab75af8eeaa8.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-green-900/70 to-emerald-800/50"></div>
            
            <div className="hero-content text-center text-white relative z-10">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Share Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    Knowledge
                  </span>
                </motion.h1>
                <motion.p 
                  className="mb-8 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Help others by sharing your expertise and building your reputation
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link to="/allQuery">
                    <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg">
                      Answer Queries
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/zWc3Tpdm/e8c477bc-e0f6-4ad7-91eb-12e8ebb4f99f.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-800/50"></div>
            
            <div className="hero-content text-center text-white relative z-10">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Smart <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Recommendations
                  </span>
                </motion.h1>
                <motion.p 
                  className="mb-8 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Get personalized solutions and recommendations tailored just for you
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link to="/allQuery">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg">
                      View Recommendations
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-next !text-white !w-12 !h-12 bg-black/30 hover:bg-black/50 rounded-full !right-4 transition-all duration-300"></div>
      <div className="swiper-button-prev !text-white !w-12 !h-12 bg-black/30 hover:bg-black/50 rounded-full !left-4 transition-all duration-300"></div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/30 z-20">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 swiper-progress"></div>
      </div>
    </div>
  );
};

export default Slider;