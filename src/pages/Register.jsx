import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const {createUser,signItWithGoogle}=useContext(AuthContext);

  const location=useLocation()
  const navigate=useNavigate();
  const from=location.state ||'/';


  const handleRegister=(e)=>{
    e.preventDefault();
    const form=e.target;
    const formData=new FormData(form);
    const {email,password,...res}=Object.fromEntries(formData.entries());
   createUser(email,password)
   .then(res=>{
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your account has been created successfully",
  showConfirmButton: false,
  timer: 1500
});
    navigate(form)
   })



  
  }

  const handleGoogleLogin=()=>{
    signItWithGoogle()
     .then((res) => {
         Swal.fire({
          title: 'Google Sign-in Success!',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0275/6457/2777/articles/050eef32fe16075ac9a3310a1d310593.jpg?v=1652231425',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Google Login Success',
          confirmButtonColor: '#6366F1',
          confirmButtonText: 'Nice!',
        });
        navigate(from)
      })
      .catch((err) => {
        console.error(err);
      });

  }



  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full"
      >
        {/* Left - Image Section */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="https://i.ibb.co/9kD2n4dv/b16dd7d9-bf71-44f6-b634-36db7559b7ec.jpg"
            alt="Register Visual"
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
            <h2 className="text-2xl font-bold text-indigo-700">Create your account</h2>
          </div>

          

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             <input
              type="url"
              name="profilePic"
              placeholder="Photo URL"
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
              Register
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </div>

          <div className="mt-6 text-center">
            <button onClick={handleGoogleLogin} className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
