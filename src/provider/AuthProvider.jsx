import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user)

  //console.log(user, loading);

  const handleRegister = (email, password) => {
    //setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    //setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const handleLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      //console.log("loading")
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //console.log(loading)
  const authInfo = {
    handleRegister,
    handleLogin,
    handleLogOut,
    user,
    setUser,
    loading,
    handleGoogleLogin,
    setLoading,
    updateUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
