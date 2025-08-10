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
    console.log( formData);

    const recommendation = {
      ...formData,
      queryId: singleQuery._id,
      recommendedProductId: singleQuery._id,
      queryTitle: singleQuery.queryTitle,
      userEmail: singleQuery.userEmail,
      userName: singleQuery.userName,
      myProduct:singleQuery.productName,
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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 my-12">
      {/* Product info and image side by side */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
        <img
          src={singleQuery.productImage}
          alt={singleQuery.productName}
          className="w-full md:w-1/3 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-700 mb-2">{singleQuery.productName}</h2>
          <p className="text-sm text-gray-600 mb-1"><strong>Brand:</strong> {singleQuery.productBrand}</p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Query:</h3>
            <p className="text-gray-700 leading-relaxed">{singleQuery.queryTitle}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Boycott Reason:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{singleQuery.boycottReason}</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="flex items-center gap-4 mb-10 border-t border-b border-gray-200 py-4">
        <img
          src={singleQuery?.userPhoto}
          alt={singleQuery.userName}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow"
        />
        <div>
          <p className="font-semibold text-gray-900">{singleQuery.userName}</p>
          <p className="text-xs text-gray-500">{singleQuery.userEmail}</p>
          <p className="text-xs text-gray-400 mt-1">Date: {new Date(singleQuery.date).toLocaleString()}</p>
        </div>
      </div>

      {/* Recommendation form and list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="">
          <h3 className="text-2xl font-semibold mb-6">Add a Recommendation</h3>
          <form onSubmit={handleRecommend} className="space-y-5">
            <input
              type="text"
              name="recommendationTitle"
              placeholder="Recommendation Title"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="recommendedProductName"
              placeholder="Recommended Product Name"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="recommendedProductImage"
              placeholder="Recommended Product Image URL"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="recommendationReason"
              placeholder="Recommendation Reason"
              required
              rows={5}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Add Recommendation
            </button>
          </form>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Recommendations</h3>
          <ProductRecommendations recommendations={recommendations} />
        </section>
      </div>
    </div>
  );
};

export default QueryDetails;
