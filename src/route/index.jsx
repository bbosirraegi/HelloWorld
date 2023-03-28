import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "components/layout/MainLayout";
import { Topic, Main, Posts, SignIn, Mypage, TopicDetail } from "route/pages";
import ModalTest from "route/pages/Topic/components/Modal";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "components/ErrorPage";

const IndexRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} />}>
        <Route index element={<Main />} />
        <Route path="/topic">
          <Route index element={<Topic />} />
          <Route path=":topic_id" element={<TopicDetail />} />
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
      <Route
        path="/signin"
        element={!isLoggedIn ? <SignIn /> : <ErrorPage msg={"비정상적 접근"} />}
      />
    </Routes>
  );
};

export default IndexRouter;
