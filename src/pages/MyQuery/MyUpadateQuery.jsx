import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const MyUpdateQuery = () => {
  const query = useLoaderData();
  const {
    _id,
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottReason,
  } = query;

  const handleUpdate = (e) =>{
    e.preventDefault();
    const form=e.target;
    const fromData =new FormData(form);
    const updateData=Object.fromEntries(fromData.entries())
    axios.patch(`http://localhost:3000/queries/id/${_id}`,updateData)
    .then((res) =>{
       
       Swal.fire({
           position: "top-end",
           icon: "success",
             title: 'Your query was update successfully!',
          showConfirmButton: false,
          timer: 1500
       });



      
    })

   
  }



  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
        Update Your Product Query
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            defaultValue={productName}
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
            defaultValue={productBrand}
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
            defaultValue={productImage}
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
            defaultValue={queryTitle}
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
            defaultValue={boycottReason}
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
            Update Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyUpdateQuery;
