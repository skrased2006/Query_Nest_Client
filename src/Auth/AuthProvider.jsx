import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';


const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)

    const provider = new GoogleAuthProvider();


    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(curentUser)=>{
            setUser(curentUser)
        });
        return ()=>{
            unsubscribe()
        }

    })

    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signItWithGoogle=()=>{
        return signInWithPopup(auth,provider)

    }
    const logOut=()=>{
        return signOut(auth);
    }





    const userInfo={
        user,
        setUser,
        createUser,
        signItWithGoogle,
        login,
        logOut

    }




    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;