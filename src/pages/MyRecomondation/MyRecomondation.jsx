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
      fetch(`https://my-query-server.vercel.app/my-recommendations?email=${user.email}`,{
        headers:{
          authorization:`Bearer ${user.accessToken}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user?.email,user?.accessToken]);

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this recommendation!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (confirm.isConfirmed) {
    fetch(`https://my-query-server.vercel.app/my-recommendations/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setRecommendations((prev) =>
            prev.filter((rec) => rec._id !== id)
          );
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
         <Typewriter
              words={[
              ' My Recommendations',
             ]}
             loop={true}
             cursor
             cursorStyle="|"
             typeSpeed={70}
             deleteSpeed={50}
             delaySpeed={1500}
          /> 
        </h2>
      {recommendations.length === 0 ? (
        <p className="text-center text-gray-600">No recommendations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Recommend Product</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Query Title</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr key={rec._id} className="hover:bg-gray-50 transition-all">
                  <td className="border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={rec.recommendedProductImage}
                        alt={rec.recommendedProductName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{rec.recommendedProductName}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{rec.recommendationReason}</td>
                  <td className="border px-4 py-2">{rec.queryTitle}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(rec._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
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
