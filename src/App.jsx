import React, { useEffect, useState } from "react";
import { AnyProvider } from "./Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IndexRouter from "./route";
import LoadingPage from "LoadingPage";
import "App.css";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인한 사용자 정보 받아오기
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // const uid = user.uid;
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          profile: user.photoURL,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return init ? (
    <AnyProvider>
      <IndexRouter userObj={userObj} isLoggedIn={isLoggedIn} />
    </AnyProvider>
  ) : (
    <LoadingPage />
  );
};

export default App;
