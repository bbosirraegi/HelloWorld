import React, { useEffect, useState } from "react";
import IndexRouter from "./route";
import { MainLayout } from "./components";
import { AnyProvider } from "./Context";
import "./App.css";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fBase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return init ? (
    <AnyProvider>
      <IndexRouter isLoggedIn={isLoggedIn} />
    </AnyProvider>
  ) : (
    <div>Initializing...</div>
  );
};

export default App;
