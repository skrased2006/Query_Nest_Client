import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Typewriter } from 'react-simple-typewriter';
import Loading from '../Loading/Loading';

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Small loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch recommendations
  useEffect(() => {
    if (user?.email) {
      fetch(`https://b11a11-server-side-skrased2006.vercel.app/my-recommendations?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setRecommendations(data))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user?.email, user?.accessToken]);

  // Handle delete
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
      fetch(`https://b11a11-server-side-skrased2006.vercel.app/my-recommendations/${id}`, {
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

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 max-w-8xl mx-auto">
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
        <p className="text-center text-gray-500 italic text-base sm:text-lg mt-10">
          No recommendations found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full bg-white divide-y divide-gray-200 table-auto sm:table-fixed">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                  #
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                  Recommend Product
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                  Reason
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                  Query Title
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-center text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recommendations.map((rec, index) => (
                <tr key={rec._id} className="hover:bg-indigo-50 transition-colors duration-200">
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-gray-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={rec.recommendedProductImage}
                        alt={rec.recommendedProductName}
                        className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg shadow-sm"
                      />
                      <span className="font-semibold truncate max-w-[130px] sm:max-w-[160px]">
                        {rec.recommendedProductName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-gray-600 max-w-[150px] break-words">
                    {rec.recommendationReason}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-gray-600">
                    {rec.queryTitle}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-center">
                    <button
                      onClick={() => handleDelete(rec._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecommendation;
