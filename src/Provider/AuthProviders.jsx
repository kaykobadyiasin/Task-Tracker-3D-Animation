import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';

// create context 
export const AuthContext = createContext()

const AuthProviders = ({ children }) => {
    // app auth 
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    // google sign In 
    const signIn = () => {
        return signInWithPopup(auth, provider)
    }

    // google sign out 
    const logOut = () => {
        signOut(auth)
    }

    // current user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('auth State change', currentUser);
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
        }
    })

    const userIfo = {
        user,
        loading,
        setLoading,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={userIfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;