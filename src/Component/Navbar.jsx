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
    isActive ? "text-indigo-600" : "hover:text-indigo-600 transition";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-bold text-xl"
        >
          <img
            src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
            alt="QueryNest Logo"
            className="w-8 h-8 rounded-xl"
          />
          <span>QueryNest</span>
        </Link>

        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
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

        
        <nav
          className={`flex-col md:flex-row md:flex items-center gap-6 text-gray-800 font-medium mx-auto absolute md:static top-full left-0 right-0 bg-white md:bg-transparent md:justify-center transition-all duration-300 md:transition-none z-40 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
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
            </>
          )}

          <div className="md:hidden mt-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-white btn font-semibold bg-red-500 w-full py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded-md bg-indigo-700 text-white font-semibold block text-center"
                    : "px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition block text-center"
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>

      
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white btn font-semibold bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-md bg-indigo-700 text-white font-semibold"
                  : "px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
