import React from 'react';


const ProductRecommendations = ({recommendations }) => {

   

  const sortedData = [...recommendations].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );





  return (
   <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Recommendations for this product</h2>

      {sortedData.length === 0 ? (
        <p className="text-gray-600">No recommendations yet for this product.</p>
      ) : (
        sortedData.map((rec) => (
          <div key={rec._id} className="border rounded-lg p-4 mb-6 shadow-sm flex gap-4 items-start">
        
           
              <img
                src={rec.recommendedProductImage}
                alt={rec.recommenderName}
                className="w-12 h-12 rounded-full object-cover mt-1"
              />
           

           
            <div className="flex-1">
              <p className="font-semibold text-lg mb-1">Product Title: {rec.recommendationTitle}</p>
              <p className="text-gray-700 mb-2">
                <strong>Reason:</strong> {rec.recommendationReason}
              </p>
              <p className="text-sm text-gray-500">
                — {rec.recommenderName} ({rec.recommenderEmail})
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Date: {new Date(rec.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductRecommendations;



// const ProductRecommendations = ({ recommendations }) => {
//   const sortedData = [...recommendations].sort(
//     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//   );

//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-green-700">Recommendations for this product</h2>

//       {sortedData.length === 0 ? (
//         <p className="text-gray-600">No recommendations yet for this product.</p>
//       ) : (
//         sortedData.map((rec, index) => (
//           <div key={rec._id || index} className="border rounded-lg p-4 mb-6 shadow-sm flex gap-4 items-start">
//             <img
//               src={rec.recommendedProductImage}
//               alt={rec.recommenderName}
//               className="w-12 h-12 rounded-full object-cover mt-1"
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-lg mb-1">Product Title: {rec.recommendationTitle}</p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Reason:</strong> {rec.recommendationReason}
//               </p>
//               <p className="text-sm text-gray-500">
//                 — {rec.recommenderName} ({rec.recommenderEmail})
//               </p>
//               <p className="text-xs text-gray-400 mt-1">
//                 Date: {new Date(rec.timestamp).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductRecommendations;

