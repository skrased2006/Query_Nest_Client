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
            <li><Link to="/allQuery" className="hover:text-indigo-400 transition">Queries</Link></li>
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
              href="https://www.facebook.com/profile.php?id=61557281361139"
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
  href="https://www.instagram.com/sksayem2006/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="text-gray-300 hover:text-pink-500 transition"
  title="Instagram"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.646.069 4.849s-.012 3.584-.069 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.069c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.765.128 4.608.388 3.555 1.44c-1.053 1.053-1.313 2.21-1.371 3.497C2.012 6.668 2 7.077 2 10.336v3.327c0 3.259.012 3.668.07 4.948.058 1.287.318 2.444 1.371 3.497 1.053 1.053 2.21 1.313 3.497 1.371C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.287-.058 2.444-.318 3.497-1.371 1.053-1.053 1.313-2.21 1.371-3.497.058-1.28.07-1.689.07-4.948v-3.327c0-3.259-.012-3.668-.07-4.948-.058-1.287-.318-2.444-1.371-3.497C19.392.388 18.235.128 16.948.07 15.668.012 15.259 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
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
