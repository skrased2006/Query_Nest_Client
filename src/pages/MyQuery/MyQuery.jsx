import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import MySingleQuery from './MySingleQuery';

const MyQuery = () => {

    const {user}=useContext(AuthContext);
    const[myQuery,setMyQuery]=useState([]);


    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/queries/email/${user.email}`)
            .then(res=>res.json())
            .then(data=>{
                setMyQuery(data);
            })
        }
    },[user?.email])

    const sortedData=[...myQuery].sort(
        (a,b)=>new Date(b.date) - new Date(a.date)
    );
   
    const handleDelete=(deletedId)=>{
      const confirmDelete = myQuery.filter(query=>query._id!== deletedId);
      setMyQuery(confirmDelete);
    }
  

    


    return (
        <div className='max-w-7xl mx-auto py-8'>
              <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">My Queries</h2>
        <p className="text-gray-600 mb-4 text-center">Here you can view, update, or delete your submitted queries.</p>
     
     {sortedData?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((mySingleQuery) => (
            <MySingleQuery key={mySingleQuery._id} mySingleQuery={mySingleQuery} 
             onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No queries found.</p>
      )}

            
            
        </div>
    );
};

export default MyQuery;