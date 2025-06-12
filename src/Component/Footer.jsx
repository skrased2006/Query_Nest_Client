import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

      
        <div className="flex flex-col items-start space-y-2">
          <Link to="/" className="flex items-center gap-3 text-indigo-400 font-extrabold text-2xl">
            <img
              src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
              alt="QueryNest Logo"
              className="w-10 h-10 rounded-xl"
            />
            <span>QueryNest</span>
          </Link>
          <p className="text-gray-400 max-w-xs">
            Your one-stop platform for sharing and discovering quality queries and personalized recommendations.
          </p>
        </div>

      
        <div>
          <h3 className="text-indigo-400 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
            <li><Link to="/queries" className="hover:text-indigo-400 transition">Queries</Link></li>
            <li><Link to="/recommendations-for-me" className="hover:text-indigo-400 transition">Recommendations</Link></li>
            <li><Link to="/login" className="hover:text-indigo-400 transition">Login</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-indigo-400 font-semibold mb-4">Contact Us</h3>
          <p>Email: <a href="mailto:support@querynest.com" className="hover:text-indigo-400 transition">support@querynest.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-indigo-400 transition">+1 (234) 567-890</a></p>
          <p className="mt-4 text-gray-400 text-sm">Mon - Fri: 9 AM - 6 PM</p>
        </div>

       
        <div>
          <h3 className="text-indigo-400 font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/YourPage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-300 hover:text-indigo-400 transition"
              title="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.006 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17.006 22 12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-indigo-400 transition"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.849-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667h-3.554v-11.46h3.413v1.561h.049c.476-.899 1.637-1.848 3.369-1.848 3.602 0 4.268 2.37 4.268 5.455v6.292zm-14.358-13.02c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.07 2.069-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zm1.777 13.02h-3.554v-11.46h3.554v11.46zm16.134-22.452h-22.66c-.553 0-1 .448-1 1v22.999c0 .553.447 1 1 1h22.661c.553 0 1-.447 1-1v-22.999c0-.552-.447-1-1-1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

     
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} QueryNest Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
