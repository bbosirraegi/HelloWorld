import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "components/layout/MainLayout";
import { Topic, Main, Posts, SignIn, Mypage, TopicDetail, MainDetail } from "route/pages";
import ModalTest from "components/Modal";
import AdminPage from "./pages/AdminPage";
import { useTopicContext } from "App";
//import MainDetail from "./pages/Main/MainDetail";

const IndexRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  const topic = useTopicContext();
  console.log(topic);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            refreshUser={refreshUser}
            userObj={userObj}
            isLoggedIn={isLoggedIn}
          />
        }
      >

        <Route path="/">
          <Route index element={<Main userObj={userObj} />} />
          <Route path=":uuid" element={<MainDetail userObj={userObj} />}/>
        </Route>

        <Route path="/topic">
          <Route index element={<Topic userObj={userObj} />} />
          <Route
            path=":id"
            element={<TopicDetail userObj={userObj} topic={topic} />}
          />
        </Route>
        <Route path="/notification" element={<Topic />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/admin" element={<AdminPage userObj={userObj} />} />

        {/* 마이페이지 모달이 이동하는 링크(route) */}
        <Route path="/mypage">
          <Route path=":user_id" element={<Mypage />} />
        </Route>
        <Route path="modal_test" element={<ModalTest />} />
      </Route>
    </Routes>
  );
};

export default IndexRouter;
