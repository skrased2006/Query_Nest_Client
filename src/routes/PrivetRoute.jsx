import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user}=useContext(AuthContext)
    const location=useLocation();



    if(!user){
      return  <Navigate to='/login' state={location.pathname}></Navigate>
    }


    return children;
};

export default PrivetRoute;