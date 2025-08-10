import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Typewriter } from 'react-simple-typewriter';
import Loading from '../Loading/Loading';

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-recommendations?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user?.email, user?.accessToken]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recommendation!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      fetch(`http://localhost:3000/my-recommendations/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
            Swal.fire('Deleted!', 'Your recommendation has been deleted.', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete the recommendation.', 'error');
          }
        })
        .catch((err) => {
          console.error('Delete error:', err);
          Swal.fire('Error', 'Something went wrong.', 'error');
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
        <Typewriter
          words={['My Recommendations']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg mt-10">
          No recommendations found.
        </p>
      ) : (
        <>
          {/* Table for medium+ screens */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                    Recommended Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                    Query Title
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {recommendations.map((rec) => (
                  <tr key={rec._id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img
                          src={rec.recommendedProductImage}
                          alt={rec.recommendedProductName}
                          className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                        <span className="font-medium text-gray-800">{rec.recommendedProductName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs break-words">
                      {rec.recommendationReason}
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs break-words">
                      {rec.queryTitle}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {recommendations.map((rec) => (
              <div
                key={rec._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={rec.recommendedProductImage}
                    alt={rec.recommendedProductName}
                    className="w-14 h-14 object-cover rounded-md shadow-sm"
                  />
                  <h3 className="font-semibold text-gray-800">
                    {rec.recommendedProductName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Reason:</span> {rec.recommendationReason}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Query Title:</span> {rec.queryTitle}
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1.5 px-3 rounded-md shadow transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecommendation;
