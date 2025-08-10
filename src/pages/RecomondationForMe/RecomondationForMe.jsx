import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typewriter } from 'react-simple-typewriter';
import Loading from '../Loading/Loading';

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  console.log(recommendations);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `http://localhost:3000/recommendations-for-me?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

return (
  <div className="p-4 sm:p-6 max-w-8xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
      <Typewriter
        words={['Recommendations For Me']}
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
        No recommendations yet.
      </p>
    ) : (
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200 table-auto sm:table-fixed">
          <thead className="bg-indigo-50">
            <tr>
              {/* Use smaller padding on small screens */}
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                #
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                My Product
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                Recommender Email
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100">
                Recommended Product
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100 max-w-[150px]">
                Reason
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider border-b border-indigo-100 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recommendations.map((rec, index) => (
              <tr
                key={rec._id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-nowrap text-xs sm:text-sm text-gray-700 font-medium">
                  {index + 1}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-normal text-xs sm:text-sm text-gray-600 max-w-[100px] truncate">
                  {rec.myProduct}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-normal text-xs sm:text-sm text-gray-600 max-w-[150px] break-words">
                  {rec.recommenderEmail}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-normal text-xs sm:text-sm text-gray-600 max-w-[200px]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={rec.recommendedProductImage}
                      alt={rec.recommendedProductName}
                      className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg shadow-sm flex-shrink-0"
                    />
                    <span className="font-semibold truncate max-w-[130px] sm:max-w-[160px]">
                      {rec.recommendedProductName}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-gray-600 max-w-[150px] break-words">
                  {rec.recommendationReason}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {new Date(rec.timestamp).toLocaleString()}
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

export default RecommendationsForMe;
