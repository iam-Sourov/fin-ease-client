import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/firebase.config';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const LogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const LogOut = () => {
        setLoading(true);
        toast.success("Successfully Signed Out");
        
        return signOut(auth);
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const GoogleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // 
        });
        return () => unsubscribe();
    }, []);

    const AuthInfo = {
        user,
        setUser,
        loading,
        setLoading,
        signUp,
        LogIn,
        LogOut,
        GoogleLogin,
        updateUser,
        income,
        setIncome,
        expense,
        setExpense,
        balance,
        setBalance
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
