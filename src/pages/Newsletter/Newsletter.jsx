import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'You have successfully subscribed to our newsletter',
      timer: 2000,
      showConfirmButton: false,
    });

    setEmail('');
  };

  return (
    <section className="w-full bg-gradient-to-r from-pink-300 to-blue-400 py-12 px-4 sm:px-6 text-white rounded-xl shadow-lg my-12">
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center">
        📩 Subscribe to Our Newsletter
      </h2>
      <p className="mb-6 sm:mb-8 text-center text-base sm:text-lg max-w-2xl mx-auto">
        Get the latest updates, offers, and exclusive content delivered straight to your inbox.
      </p>

      {/* Form is stacked on mobile, row on medium+ screens */}
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row max-w-lg mx-auto w-full gap-3 sm:gap-0"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-black text-base sm:text-lg focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-yellow-300 text-pink-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-yellow-400 transition text-base sm:text-lg"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
