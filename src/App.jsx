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
        let role = 0;
        setIsLoggedIn(true);
        // const uid = user.uid;
        if (
          user.email === "jusanghui21@gmail.com" ||
          user.email === "dbsry129@naver.com"
        ) {
          role = 1;
        }
        setUserObj({
          uid: user.uid ? user.uid : "",
          displayName: user.displayName ? user.displayName : "",
          email: user.email ? user.email : "",
          profile: user.photoURL ? user.photoURL : "/image/user.png",
          role: role,
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
