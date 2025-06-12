import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router'; // ✅ Fixed import
import { motion } from 'framer-motion';

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
        pagination={{ clickable: true }}
        navigation={true}
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full"
      >

      
        <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/nq4MTpLz/Sk-Rased-A-thoughtful-young-person-sitting-at-a-desk-with-a-c8ec6365-7092-4454-a541-926b4631abca.png')",
            }}
          >
            <div ></div>
            <div className="hero-content text-neutral-content text-center">
              <motion.div
                className="items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="mb-5 text-3xl sm:text-5xl font-bold">Got a Problem? Just Ask!</h1>
                <Link to="/addQuery">
                  <button className="btn btn-primary mt-2">Get Started</button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

       <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/TMz6wrjW/Sk-Rased-A-confident-young-adult-explaining-something-to-ot-fdc7f972-c220-478e-ba7c-ab75af8eeaa8.png')",
            }}
          >
            <div ></div>
            <div className="hero-content text-neutral-content text-center">
              <motion.div
                className="items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="mb-5 text-3xl sm:text-5xl font-bold">  Share What You Know</h1>
                <Link to="/allQuery">
                  <button className="btn btn-primary mt-2"> Answer Queries</button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        
       <SwiperSlide>
          <div
            className="hero min-h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/zWc3Tpdm/e8c477bc-e0f6-4ad7-91eb-12e8ebb4f99f.jpg')",
            }}
          >
            <div ></div>
            <div className="hero-content text-neutral-content text-center">
              <motion.div
                className="items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="mb-5 text-3xl sm:text-5xl font-bold">  Get Smart Recommendations</h1>
                <Link to="/allQuery">
                  <button className="btn btn-primary mt-2">View Recommendations</button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;

