// src/components/Slider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

const Slider = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/DNgsBBk/Organizational-Knowledge-Sharing-994561500395.jpg')",
            }}
          >
            <div className=" bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center px-4">
                Ask Smart. Learn Fast.
              </h2>
              <Link to="/login">
                <button className="mt-6 sm:mt-10 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium">
                  Join QueryNest
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/DNgsBBk/Organizational-Knowledge-Sharing-994561500395.jpg')",
            }}
          >
            <div className=" bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center px-4">
                Help Others. Share Knowledge.
              </h2>
              <Link to="/queries">
                <button className="mt-6 sm:mt-10 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium">
                  Browse Queries
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/S4xDMN2H/What-are-Personalized-Recommendations.jpg')",
            }}
          >
            <div className=" bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center px-4">
                Get Personalized Recommendations
              </h2>
              <Link to="/recommendations-for-me">
                <button className="mt-6 sm:mt-10 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
