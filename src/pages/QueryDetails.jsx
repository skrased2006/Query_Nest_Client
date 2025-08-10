import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import ProductRecommendations from './AllRecomondation/AllRecommendation';
import Swal from 'sweetalert2';

const QueryDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const singleQuery = useLoaderData();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (singleQuery?._id) {
      fetch(`http://localhost:3000/recommendation/${singleQuery._id}`)
        .then(res => res.json())
        .then(data => setRecommendations(data))
        .catch(err => console.error(err));
    }
  }, [singleQuery?._id]);

  const handleRecommend = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form).entries());

    const recommendation = {
      ...formData,
      queryId: singleQuery._id,
      recommendedProductId: singleQuery._id,
      queryTitle: singleQuery.queryTitle,
      userEmail: singleQuery.userEmail,
      userName: singleQuery.userName,
      myProduct: singleQuery.productName,
      timestamp: new Date().toISOString(),
      recommenderEmail: user.email,
      recommenderName: user.name,
      recommenderPhoto: user.userPhoto,
    };

    try {
      const res = await axios.post('http://localhost:3000/recommendation', recommendation);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Your recommendation was added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setRecommendations(prev => [...prev, recommendation]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
 <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-8 my-6 sm:my-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
    
    {/* Left side: Product info + form */}
    <div className="flex flex-col gap-6">
      {/* Product info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={singleQuery.productImage}
          alt={singleQuery.productName}
          className="w-full md:w-1/3 h-40 sm:h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
        />
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
            {singleQuery.productName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            <strong>Brand:</strong> {singleQuery.productBrand}
          </p>
          <div className="mt-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Query:</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{singleQuery.queryTitle}</p>
          </div>
          <div className="mt-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Boycott Reason:</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{singleQuery.boycottReason}</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="flex flex-wrap items-center gap-4 border-t border-b border-gray-200 py-3">
        <img
          src={singleQuery?.userPhoto}
          alt={singleQuery.userName}
          className="w-12 sm:w-14 h-12 sm:h-14 rounded-full object-cover border border-gray-300 shadow"
        />
        <div>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">{singleQuery.userName}</p>
          <p className="text-xs sm:text-sm text-gray-500">{singleQuery.userEmail}</p>
          <p className="text-xs text-gray-400 mt-1">
            Date: {new Date(singleQuery.date).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Form */}
      <section>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Add a Recommendation</h3>
        <form onSubmit={handleRecommend} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            name="recommendationTitle"
            placeholder="Recommendation Title"
            required
            className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="recommendedProductName"
            placeholder="Recommended Product Name"
            required
            className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="recommendedProductImage"
            placeholder="Recommended Product Image URL"
            required
            className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <textarea
            name="recommendationReason"
            placeholder="Recommendation Reason"
            required
            rows={4}
            className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Add Recommendation
          </button>
        </form>
      </section>
    </div>

    {/* Right side: Recommendations with scroll */}
    <div className="max-h-[60vh] sm:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto pr-1 sm:pr-2">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Recommendations</h3>
      <ProductRecommendations recommendations={recommendations} />
    </div>
  </div>
</div>

  );
};

export default QueryDetails;
