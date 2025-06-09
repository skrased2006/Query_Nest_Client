import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`http://localhost:3000/recommendations-for-me?email=${user.email}`);
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Recommendations For Me</h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-gray-600">No recommendations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Recommender Email</th>
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Reason</th>
                <th className="py-2 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={rec._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{rec.recommenderEmail}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex items-center gap-2">
                      <img
                        src={rec.recommendedProductImage}
                        alt={rec.recommendedProductName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{rec.recommendedProductName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border">{rec.recommendationReason}</td>
                  <td className="py-2 px-4 border">{new Date(rec.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
