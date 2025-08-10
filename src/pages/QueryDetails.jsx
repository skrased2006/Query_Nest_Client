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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 my-8">
      <img
        src={singleQuery.productImage}
        alt={singleQuery.productName}
        className="w-full h-56 object-cover mb-6 rounded-lg"
      />
      <h2 className="text-3xl font-bold text-green-700 mb-2">{singleQuery.productName}</h2>
      <p className="text-sm text-gray-500 mb-4">Brand: {singleQuery.productBrand}</p>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Query:</h3>
        <p className="text-gray-700">{singleQuery.queryTitle}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Boycott Reason:</h3>
        <p className="text-gray-600 text-sm">{singleQuery.boycottReason}</p>
      </section>

      <section className="flex items-center gap-4 mb-6">
        <img
          src={singleQuery?.userPhoto}
          alt={singleQuery.userName}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <p className="font-medium text-gray-900">{singleQuery.userName}</p>
          <p className="text-xs text-gray-500">{singleQuery.userEmail}</p>
          <p className="text-xs text-gray-400 mt-1">
            Date: {new Date(singleQuery.date).toLocaleString()}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Add a Recommendation</h3>
        <form onSubmit={handleRecommend} className="space-y-4">
          <input
            type="text"
            name="recommendationTitle"
            placeholder="Recommendation Title"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="recommendedProductName"
            placeholder="Recommended Product Name"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="recommendedProductImage"
            placeholder="Recommended Product Image URL"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="recommendationReason"
            placeholder="Recommendation Reason"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Recommendation
          </button>
        </form>
      </section>

      <section>
        <ProductRecommendations recommendations={recommendations} />
      </section>
    </div>
  );
};

export default QueryDetails;
