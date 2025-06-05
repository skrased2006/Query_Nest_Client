import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AddQuery = () => {
    const {user}=useContext(AuthContext);


    const handleForm=(e)=>{
        e.preventDefault();

        const form=e.target;
        const  formData=new FormData(form);
        const queryData=Object.fromEntries(formData.entries())

   const newQuery = {
      ...queryData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      date: new Date().toISOString(),
      recommendationCount: 0,
    };
    axios.post('http://localhost:3000/queries',newQuery)
    .then(res=>{
        console.log(res.data);
    })



   
        
    }



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
        Submit a New Product Query
      </h2>

      <form onSubmit={handleForm} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Brand
          </label>
          <input
            type="text"
            name="productBrand"
            placeholder="Enter brand name"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            name="productImage"
            placeholder="Paste image URL"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Query Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Query Title
          </label>
          <input
            type="text"
            name="queryTitle"
            placeholder="E.g. Is there any better product with same quality?"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Boycott Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Boycotting Reason Details
          </label>
          <textarea
            name="boycottReason"
            placeholder="Explain why you want to avoid this product"
            required
            className="textarea textarea-bordered w-full"
            rows="5"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Add Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuery;



// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddQuery = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     productName: "",
//     productBrand: "",
//     productImage: "",
//     queryTitle: "",
//     boycottReason: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newQuery = {
//       ...formData,
//       userEmail: user.email,
//       userName: user.displayName,
//       userPhoto: user.photoURL,
//       date: new Date().toISOString(),
//       recommendationCount: 0,
//     };

//     try {
//       await axios.post("http://localhost:3000/queries", newQuery);
//       alert("Query submitted successfully!");
//       navigate("/my-queries");
//     } catch (error) {
//       console.error("Error adding query:", error);
//       alert("Failed to submit query.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto my-10 p-6 shadow-lg bg-white rounded-xl">
//       <h2 className="text-2xl font-bold mb-6">Add a New Query</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required className="input input-bordered w-full" />
//         <input type="text" name="productBrand" placeholder="Product Brand" onChange={handleChange} required className="input input-bordered w-full" />
//         <input type="text" name="productImage" placeholder="Product Image URL" onChange={handleChange} required className="input input-bordered w-full" />
//         <input type="text" name="queryTitle" placeholder="Query Title (e.g. Is there any better product?)" onChange={handleChange} required className="input input-bordered w-full" />
//         <textarea name="boycottReason" placeholder="Boycotting Reason Details" onChange={handleChange} required className="textarea textarea-bordered w-full" rows="4"></textarea>
//         <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700">Add Query</button>
//       </form>
//     </div>
//   );
// };

// export default AddQuery;
