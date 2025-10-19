import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaEye, FaEdit, FaTrash, FaCalendar, FaTag, FaComment, FaExternalLinkAlt } from 'react-icons/fa';

const MySingleQuery = ({ mySingleQuery, onDelete }) => {
  const {
    _id,
    productBrand,
    productName,
    productImage,
    queryTitle,
    date,
    recommendationCount
  } = mySingleQuery;

  const handleDeleteQuery = (id) => {
    Swal.fire({
      title: "Delete Query?",
      text: "This action cannot be undone. All recommendations will also be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: '#1f2937',
      color: 'white',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b11a11-server-side-skrased2006.vercel.app/queries/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your query has been permanently deleted.",
              icon: "success",
              confirmButtonColor: "#10b981",
              background: '#1f2937',
              color: 'white',
              customClass: {
                popup: 'rounded-2xl'
              }
            });
            onDelete(id);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Query not found or already deleted.",
              icon: "error",
              confirmButtonColor: "#ef4444",
              background: '#1f2937',
              color: 'white',
              customClass: {
                popup: 'rounded-2xl'
              }
            });
          }
        })
        .catch((error) => {
          console.error('Delete error:', error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#ef4444",
            background: '#1f2937',
            color: 'white',
            customClass: {
              popup: 'rounded-2xl'
            }
          });
        });
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Recommendation Count */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <FaComment className="text-xs" />
            {recommendationCount ?? 0}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Product Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 mb-2">
            {productName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <FaTag className="text-indigo-500" />
            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
              {productBrand}
            </span>
          </div>
        </div>

        {/* Query Title */}
        <div>
          <p className="text-gray-700 leading-relaxed line-clamp-3 text-sm">
            {queryTitle}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
          <FaCalendar className="text-gray-400" />
          <span>{formatDate(date)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Link to={`/query/${_id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaEye className="text-xs" />
              View
            </motion.button>
          </Link>

          <Link to={`/myUpdateQuery/${_id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-amber-500 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-amber-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaEdit className="text-xs" />
              Edit
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDeleteQuery(_id)}
            className="flex-1 bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <FaTrash className="text-xs" />
            Delete
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default MySingleQuery;