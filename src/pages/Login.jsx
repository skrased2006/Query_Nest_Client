import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {

  const { signItWithGoogle,login}=useContext(AuthContext);


  const handeLogin=(e)=>{
    e.preventDefault();

    const email=e.target.email.value;
    const password=e.target.password.value;
    login(email,password)
    .then(res=>{
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your are logged in",
  showConfirmButton: false,
  timer: 1500
});
      console.log(res);
    })





  }

  const handleGoogleLogin=()=>{
    signItWithGoogle()
    .then(res=>{
      const user=res.user;
      console.log(user);
    })
    
  }
  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full"
      >
        {/* Left - Image Section */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="https://i.ibb.co/GvXDP3w1/38124f89-c82e-4b27-80ab-cae2d0b1b9f4.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://i.ibb.co/HDTgyWMD/23e4f9af-77f8-4d78-bbd2-57abfbc2d183.jpg"
              alt="QueryNest Logo"
              className="w-10 h-10 rounded-xl"
            />
            <h2 className="text-2xl font-bold text-indigo-700">QueryNest</h2>
          </div>

          <form onSubmit={handeLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-4">
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition text-gray-700">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Register
            </Link>
          </div>

          <div className="mt-6 bg-indigo-50 border border-indigo-200 text-indigo-800 p-4 rounded-md text-sm leading-relaxed">
            Welcome to <strong>QueryNest</strong> – where your tech queries meet the right minds.
            Join now to share questions, explore recommendations, and grow your knowledge.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
