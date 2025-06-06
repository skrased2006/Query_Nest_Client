import React, { useContext } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import AllRecommendation from './AllRecomondation/AllRecommendation';
import ProductRecommendations from './AllRecomondation/AllRecommendation';

const QueryDetails = () => {
  const { id } = useParams();
  const {user}=useContext(AuthContext);
 
  // singleQueryData থেকে ওই id এর data fetch করছো
  const singleQueryData = useLoaderData();
  const singleQuery = singleQueryData.find((data) => data._id === id);


  const handleRecommend=(e)=>{
    e.preventDefault();
    const form=e.target;
    const data= new FormData(form);
    const formData=Object.fromEntries(data.entries());
    


   const recommendation = {
  ...formData,
  queryId: singleQuery._id,
  recommendedProductId: singleQuery._id, // ✅ এইটা ঠিক আছে
  queryTitle: singleQuery.queryTitle,
  userEmail: singleQuery.userEmail,
  userName: singleQuery.userName,
  timestamp: new Date().toISOString(),
  recommenderEmail: user.email,
  recommenderName: user.name,
  recommenderPhoto: user.userPhoto, 
};

   axios.post('http://localhost:3000/recommendation',recommendation)
   .then((res)=>{
    console.log(res.data);
   })



  }


  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 my-8">
      {/* Query Details */}
      <img
        src={singleQuery.productImage}
        alt={singleQuery.productName}
        className="w-full h-48 object-contain mb-6 rounded-lg"
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

      {/* User Info */}
      <section className="flex items-center gap-4 mb-6">
        <img
          src={singleQuery?.userPhoto}
          alt={singleQuery.userName}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <p className="font-medium text-gray-900">{singleQuery.userName}</p>
          <p className="text-xs text-gray-500">{singleQuery.userEmail}</p>
        <p className="text-xs text-gray-400 mb-3">Date: {new Date(singleQuery.date).toLocaleString()}</p>
        </div>
      </section>

      {/* Add Recommendation Form */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Add a Recommendation</h3>
        <form onSubmit={handleRecommend}  className="space-y-4">
          <input
            type="text"
            name="recommendationTitle"
            placeholder="Recommendation Title"
         
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="recommendedProductName"
            placeholder="Recommended Product Name"
           
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="recommendedProductImage"
            placeholder="Recommended Product Image URL"
          
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="recommendationReason"
            placeholder="Recommendation Reason"
           
            required
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Recommendation
          </button>
        </form>
      </section>

      <div>
        <ProductRecommendations productId={singleQuery._id}></ProductRecommendations>
      </div>

     
    </div>
  );
};

export default QueryDetails;



 
