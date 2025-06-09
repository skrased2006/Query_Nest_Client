import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-recommendations?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [user?.email]);

const handleDelete = async (id) => {
    console.log("Deleting recommendation with ID:", id)
 
  
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Recommendations</h2>
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
