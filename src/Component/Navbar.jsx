import { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive 
      ? "text-white bg-indigo-700 px-3 py-2 rounded-lg font-medium transition-all duration-200" 
      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg font-medium transition-all duration-200";

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img
                src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
                alt="QueryNest Logo"
                className="w-10 h-10 rounded-xl transform group-hover:scale-105 transition-transform duration-200 shadow-md"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QueryNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/allQuery" className={navLinkClass}>
              Queries
            </NavLink>

            {user && (
              <>
                <NavLink to="/recommendations-for-me" className={navLinkClass}>
                  For Me
                </NavLink>
                <NavLink to="/myQuery" className={navLinkClass}>
                  My Queries
                </NavLink>
                <NavLink to="/my-recommendations" className={navLinkClass}>
                  My Recommendations
                </NavLink>
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm font-medium max-w-24 truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold shadow-md"
                    : "px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-3 pb-4 border-t border-gray-200 pt-4">
            <NavLink 
              to="/" 
              className={navLinkClass} 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/allQuery"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Queries
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/recommendations-for-me"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recommendations For Me
                </NavLink>
                <NavLink
                  to="/myQuery"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Queries
                </NavLink>
                <NavLink
                  to="/my-recommendations"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Recommendations
                </NavLink>
                
                {/* User info in mobile */}
                <div className="flex items-center space-x-3 px-3 py-4 bg-gray-50 rounded-lg mt-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="pt-2">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "w-full block px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold text-center shadow-md"
                      : "w-full block px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-center shadow-md hover:shadow-lg"
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;