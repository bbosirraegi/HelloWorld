import React, { createContext, useContext, useEffect, useState } from "react";
import { AnyProvider } from "./Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IndexRouter from "./route";
import LoadingPage from "LoadingPage";
import "App.css";
import { authService, dbService } from "fBase";
import { collection, onSnapshot, query } from "firebase/firestore";

const TopicContext = createContext();

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인한 사용자 정보 받아오기
  const [userObj, setUserObj] = useState(null);
  // 토픽 data 가져오기
  const [topic, setTopic] = useState(null);
  /* Hook */

  useEffect(() => {
    const auth = getAuth();
    const q = query(collection(dbService, "topics"));
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
    });
    onSnapshot(q, (snapshot) => {
      const topicArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopic(topicArr);
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };
  return init ? (
    <AnyProvider>
      <TopicContext.Provider value={topic}>
        <IndexRouter
          userObj={userObj}
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
        />
      </TopicContext.Provider>
    </AnyProvider>
  ) : (
    <LoadingPage />
  );
};
export function useTopicContext() {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("Cannot Find Topic");
  }
  return context;
}
export default App;
