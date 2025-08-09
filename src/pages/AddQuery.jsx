import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from './Loading/Loading';

const AddQuery = () => {
    const {user}=useContext(AuthContext);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{
      const timer=setTimeout(()=>{
        setLoading(false);
      },800)
    return ()=>clearTimeout(timer)
    })


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
      if(res.data.insertedId){
        Swal.fire({
     position: "top-end",
     icon: "success",
       title: 'Your query was added successfully!',
    showConfirmButton: false,
    timer: 1500
    });
  form.reset();
      }
     
    })



   
        
    }
if(loading){
  return <Loading></Loading>
}


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
        Submit a New Product Query
      </h2>

      <form onSubmit={handleForm} className="space-y-5">
       
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




