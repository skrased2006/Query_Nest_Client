import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaGift, FaCheckCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        background: '#1f2937',
        color: 'white',
        confirmButtonColor: '#3b82f6',
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    Swal.fire({
      icon: 'success',
      title: 'Welcome to the Community! 🎉',
      text: 'You have successfully subscribed to our exclusive newsletter',
      background: '#1f2937',
      color: 'white',
      confirmButtonColor: '#10b981',
      timer: 3000,
      showConfirmButton: false,
    });

    setIsSubscribed(true);
    setEmail('');
    setIsLoading(false);
  };

  const benefits = [
    { icon: <FaGift className="text-sm" />, text: 'Exclusive Offers' },
    { icon: <FaEnvelope className="text-sm" />, text: 'Weekly Updates' },
    { icon: <FaCheckCircle className="text-sm" />, text: 'Expert Tips' }
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-2xl my-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaPaperPlane className="text-2xl text-white" />
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Updated</span>
          </h2>
          
          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Get exclusive insights, expert recommendations, and special offers delivered directly to your inbox. 
            Join thousands of professionals who never miss an update.
          </p>

          {/* Benefits */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-blue-400">{benefit.icon}</span>
                <span className="text-white text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <FaCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard! 🎉</h3>
              <p className="text-gray-300 mb-4">
                Thank you for subscribing. Check your email for a welcome gift!
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Privacy Note */}
        <motion.p 
          className="text-center text-gray-400 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;