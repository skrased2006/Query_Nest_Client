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
    <section className="w-full bg-gradient-to-r from-pink-300 to-blue-400 py-16 px-6 text-white rounded-xl shadow-lg my-16">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        📩 Subscribe to Our Newsletter
      </h2>
      <p className="mb-8 text-center text-lg max-w-2xl mx-auto">
        Get the latest updates, offers, and exclusive content delivered straight to your inbox.
      </p>

      <form onSubmit={handleSubscribe} className="flex max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-5 py-4 rounded-l-lg text-black text-lg focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-yellow-300 text-pink-900 font-bold px-8 py-4 rounded-r-lg hover:bg-yellow-400 transition text-lg"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
