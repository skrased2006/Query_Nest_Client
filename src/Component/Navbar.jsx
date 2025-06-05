import { useContext } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const {user,  logOut} =useContext(AuthContext);
  const handleLogout = () => {
    logOut();
   
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Logo + Name */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <img
            src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
            alt="QueryNest Logo"
            className="w-8 h-8 rounded-xl"
          />
          <span>QueryNest</span>
        </Link>

        {/* Center: Home, Queries, and if logged in additional links */}
        <nav className="flex items-center gap-6 text-gray-800 font-medium mx-auto">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>Home</NavLink>
          <NavLink to="/allQuery" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>Queries</NavLink>

          {user && (
            <>
              <NavLink to="/addQuery" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>
              
             Add Query
              </NavLink>
              <NavLink to="/recommendations-for-me" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>
              
                Recommendations For Me
              </NavLink>
              
              <NavLink to="/myQuery" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>
                My Queries
              </NavLink>
              <NavLink to="/my-recommendations" className={({ isActive }) => isActive ? "text-indigo-600" : ""}>
                My Recommendations
              </NavLink>
            </>
          )}
        </nav>

        {/* Right: Login / Logout */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white btn font-semibold bg-red-500 "
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
