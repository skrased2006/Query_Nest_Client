import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from './Loading/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaImage, FaTag, FaQuestionCircle, FaLightbulb, FaPaperPlane, FaUser } from 'react-icons/fa';

const AddQuery = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        productBrand: '',
        productImage: '',
        queryTitle: '',
        boycottReason: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newQuery = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            date: new Date().toISOString(),
            recommendationCount: 0,
        };

        try {
            const res = await axios.post('https://b11a11-server-side-skrased2006.vercel.app/queries', newQuery);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Query Submitted Successfully!',
                    text: 'Your question has been shared with the community',
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#1f2937',
                    color: 'white',
                    customClass: {
                        popup: 'rounded-2xl'
                    }
                });
                // Reset form
                setFormData({
                    productName: '',
                    productBrand: '',
                    productImage: '',
                    queryTitle: '',
                    boycottReason: ''
                });
                e.target.reset();
            }
        } catch (error) {
            console.error('Error submitting query:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later',
                background: '#1f2937',
                color: 'white',
                confirmButtonColor: '#3b82f6',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
                        <FaPlus className="text-white text-2xl" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Share Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Product Query
                        </span>
                    </h1>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Help the community by sharing your product concerns and get expert recommendations
                    </p>
                </motion.div>

                {/* User Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{user.displayName}</h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <FaUser className="text-gray-400" />
                                <span>Community Member</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <div className="flex items-center gap-3">
                            <FaLightbulb className="text-2xl" />
                            <h2 className="text-2xl font-bold">Product Query Form</h2>
                        </div>
                        <p className="text-indigo-100 mt-2">
                            Fill in the details below to get recommendations from the community
                        </p>
                    </div>

                    <form onSubmit={handleForm} className="p-6 lg:p-8 space-y-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                                <FaTag className="text-indigo-500" />
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
                                        placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
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
                                        placeholder="e.g., Apple, Samsung, Nike"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Image */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <FaImage className="text-indigo-500" />
                                Product Image URL *
                            </label>
                            <input
                                type="url"
                                name="productImage"
                                value={formData.productImage}
                                onChange={handleInputChange}
                                placeholder="https://example.com/product-image.jpg"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
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
                                <FaQuestionCircle className="text-indigo-500" />
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
                                    placeholder="e.g., Looking for alternatives with better battery life?"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
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
                                    placeholder="Describe your concerns... (e.g., price too high, ethical concerns, quality issues, looking for better features)"
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50"
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-2">
                                    Be specific about what you're looking for to get better recommendations
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            className="pt-6"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Submitting Query...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="text-sm" />
                                        <span>Submit Query to Community</span>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* Help Text */}
                        <p className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                            Your query will be visible to the community and you'll receive recommendations from experts
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddQuery;