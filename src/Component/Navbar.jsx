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
      ? "text-white bg-blue-700 px-3 py-1 rounded-md"
      : "text-white hover:bg-blue-600 px-3 py-1 rounded-md transition";

  return (
    <header className="bg-gradient-to-r from-pink-300 to-blue-400 shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-white text-xl">
          <img
            src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
            alt="QueryNest Logo"
            className="w-8 h-8 rounded-xl"
          />
          <span>QueryNest</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation */}
        <nav
          className={`flex-col md:flex-row md:flex items-center gap-4 font-medium absolute md:static top-full left-0 right-0 md:bg-transparent transition-all duration-300 z-40 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {/* Common Links */}
          <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/allQuery" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
            Queries
          </NavLink>

          {/* Protected Links */}
          {user && (
            <>
              <NavLink to="/recommendations-for-me" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                Recommendations For Me
              </NavLink>
              <NavLink to="/myQuery" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                My Queries
              </NavLink>
              <NavLink to="/my-recommendations" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                My Recommendations
              </NavLink>
            </>
          )}

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
