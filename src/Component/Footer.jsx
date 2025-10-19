import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaHeart, FaArrowUp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.footer 
      className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-gray-300 pt-16 pb-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="flex flex-col items-start space-y-4"
            variants={itemVariants}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
                  alt="QueryNest Logo"
                  className="w-12 h-12 rounded-xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                QueryNest
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              Your intelligent platform for sharing queries and discovering personalized product recommendations through community wisdom.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>for the community</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'All Queries', path: '/allQuery' },
                { name: 'My Queries', path: '/myQuery' },
                { name: 'For Me', path: '/recommendations-for-me' },
                { name: 'My Recommendations', path: '/my-recommendations' },
                { name: 'Add Query', path: '/addQuery' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white text-sm font-medium">Location</p>
                  <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <FaPhone className="text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white text-sm font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+880 1234-567890</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <FaEnvelope className="text-purple-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <a href="mailto:support@querynest.com" className="text-gray-400 text-sm hover:text-purple-400 transition-colors duration-300">
                    support@querynest.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <FaClock className="text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white text-sm font-medium">Hours</p>
                  <p className="text-gray-400 text-sm">Mon - Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Connect With Us
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Follow us on social media for updates and community highlights.
              </p>
              <div className="flex space-x-4">
                {[
                  { 
                    icon: FaFacebook, 
                    href: "https://www.facebook.com/profile.php?id=61557281361139", 
                    color: "hover:text-blue-500",
                    label: "Facebook"
                  },
                  { 
                    icon: FaInstagram, 
                    href: "https://www.instagram.com/sksayem2006/", 
                    color: "hover:text-pink-500",
                    label: "Instagram"
                  },
                  { 
                    icon: FaTwitter, 
                    href: "#", 
                    color: "hover:text-blue-400",
                    label: "Twitter"
                  },
                  { 
                    icon: FaLinkedin, 
                    href: "#", 
                    color: "hover:text-blue-600",
                    label: "LinkedIn"
                  }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110 shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
              
              {/* Quick Action */}
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-3">Need immediate help?</p>
                <a 
                  href="mailto:support@querynest.com" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <FaEnvelope className="text-sm" />
                  Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
          variants={itemVariants}
        >
          <div className="text-center lg:text-left">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} <span className="text-blue-400 font-semibold">QueryNest Ltd.</span> All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Building a smarter community through shared knowledge
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-blue-400 transition-colors duration-300">
              Cookies
            </Link>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;