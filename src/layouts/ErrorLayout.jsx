import React from 'react';
import { Link } from 'react-router';

const ErrorLayout = () => {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <img src="https://i.ibb.co/zHXVgZZT/449d3edc-b63d-4325-9452-ea2dcfc80290.jpg" alt="Not Found" className="w-64 mb-6" />
     
      <p className="text-xl text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
     <Link to={'/'}>
     <button
     
        className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
      >
        Go to Homepage
      </button>
     </Link> 
    </div>
    );
};

export default ErrorLayout;