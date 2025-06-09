import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase';




const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const provider = new GoogleAuthProvider();


    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(curentUser)=>{
            setUser(curentUser)
            setLoading(false)
        });
        return ()=>{
            unsubscribe()
        }

    })

    const login=(email,password)=>{
         setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signItWithGoogle=()=>{
         setLoading(true)
        return signInWithPopup(auth,provider)

    }
    const logOut=()=>{
         setLoading(true)
        return signOut(auth);
    }





    const userInfo={
        user,
        setUser,
        createUser,
        signItWithGoogle,
        login,
        logOut,
        loading,
        setLoading

    }




    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;