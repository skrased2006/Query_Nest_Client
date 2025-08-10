import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MySingleQuery = ({ mySingleQuery, onDelete }) => {
  const {
    _id,
    productBrand,
    productName,
    productImage,
    queryTitle,
    date,
  } = mySingleQuery;

  const handleDeleteQuery = (id) =>{

     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b11a11-server-side-skrased2006.vercel.app/queries/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount) {
            Swal.fire("Deleted!", "Your query has been deleted.", "success");
            onDelete(id); 
          } else {
            Swal.fire("Error!", "Query not found or already deleted.", "error");
          }
        })
        .catch((error) => {
          console.error('Delete error:', error);
          Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        });
      }
    })
  }




  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold text-green-700 mb-1">{productName}</h2>
      <p className="text-sm text-gray-500 mb-1"><strong>Brand: </strong> {productBrand}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Query:</strong> {queryTitle}</p>
      <p className="text-xs text-gray-400 mb-3">Date: {new Date(date).toLocaleString()}</p>

      <div className="flex gap-2 mt-auto">
        <Link to={`/query/${_id}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
        </Link>
        <Link to={`/myUpdateQuery/${_id}`}>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">Update</button>
        </Link>
        <button
          onClick={() => handleDeleteQuery(_id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MySingleQuery;
