import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../FIrebase/firebase.config'


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);



    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const LogOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    const GoogleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }
    console.log(auth, googleProvider);


    const AuthInfo = {
        user,
        setUser,
        loading,
        setLoading,
        signUp,
        signOut,
        LogOut,
        GoogleLogin
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <AuthContext value={AuthInfo} >
            {children}
        </AuthContext>
    );
};

export default AuthProvider;