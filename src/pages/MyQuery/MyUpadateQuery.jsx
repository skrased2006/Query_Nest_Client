import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaSync, FaImage, FaTag, FaQuestionCircle, FaEdit, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const MyUpdateQuery = () => {
  const query = useLoaderData();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    productName: query.productName,
    productBrand: query.productBrand,
    productImage: query.productImage,
    queryTitle: query.queryTitle,
    boycottReason: query.boycottReason,
  });

  const {
    _id,
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottReason,
  } = query;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await axios.patch(`https://b11a11-server-side-skrased2006.vercel.app/queries/id/${_id}`, formData);
      
      if (res.data.modifiedCount > 0) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: 'Query Updated Successfully!',
          text: 'Your changes have been saved',
          showConfirmButton: false,
          timer: 2000,
          background: '#1f2937',
          color: 'white',
          customClass: {
            popup: 'rounded-2xl'
          }
        });
        
        // Navigate back to my queries page
        navigate('/myQuery');
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Please try again later',
        background: '#1f2937',
        color: 'white',
        confirmButtonColor: '#3b82f6',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Discard Changes?',
      text: 'Any unsaved changes will be lost',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, discard',
      cancelButtonText: 'Continue editing',
      background: '#1f2937',
      color: 'white',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/myQuery');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl mb-6">
            <FaEdit className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Update Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Product Query
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Modify your product query details and help the community provide better recommendations
          </p>
        </motion.div>

        {/* Current Query Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaCheckCircle className="text-green-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-900">Current Query Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-32 object-cover rounded-xl border border-gray-200"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-lg font-semibold text-gray-900">{productName}</p>
              <p className="text-sm text-gray-600">Brand: {productBrand}</p>
              <p className="text-sm text-gray-700 line-clamp-2">{queryTitle}</p>
            </div>
          </div>
        </motion.div>

        {/* Update Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <FaSync className="text-2xl" />
              <h2 className="text-2xl font-bold">Update Query Form</h2>
            </div>
            <p className="text-green-100 mt-2">
              Make changes to your query below and save the updates
            </p>
          </div>

          <form onSubmit={handleUpdate} className="p-6 lg:p-8 space-y-6">
            {/* Product Information */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <FaTag className="text-green-500" />
                Product Information
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    name="productBrand"
                    value={formData.productBrand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaImage className="text-green-500" />
                Product Image URL *
              </label>
              <input
                type="url"
                name="productImage"
                value={formData.productImage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              />
              {formData.productImage && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Image Preview:</p>
                  <img
                    src={formData.productImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Query Details */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <FaQuestionCircle className="text-green-500" />
                Query Details
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Query Title *
                </label>
                <input
                  type="text"
                  name="queryTitle"
                  value={formData.queryTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why are you looking for alternatives? *
                </label>
                <textarea
                  name="boycottReason"
                  value={formData.boycottReason}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Be specific about what you're looking for to get better recommendations
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-500 text-white font-semibold py-4 px-6 rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-3 order-2 sm:order-1"
              >
                <FaArrowLeft className="text-sm" />
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={isUpdating}
                whileHover={{ scale: isUpdating ? 1 : 1.02 }}
                whileTap={{ scale: isUpdating ? 1 : 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 order-1 sm:order-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating Query...</span>
                  </>
                ) : (
                  <>
                    <FaSync className="text-sm" />
                    <span>Update Query</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Help Text */}
            <p className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              Your updated query will be visible to the community immediately
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MyUpdateQuery;