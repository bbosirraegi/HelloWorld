import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components";
import {
  Topic,
  Main,
  Posts,
  SignIn,
  Mypage,
  SignOut,
  TopicDetail,
} from "./pages";
import ModalTest from "./pages/Topic/components/Modal";

const IndexRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="/topic">
          <Route index element={<Topic />} />
          <Route path=":topic_id" element={<TopicDetail />} />
        </Route>
        <Route path="/notification" element={<Topic />} />
        <Route path="/posts" element={<Posts />} />

        {/* 마이페이지 모달이 이동하는 링크(route) */}
        <Route path="/mypage">
          <Route path="signin" element={<SignIn />} />
          <Route path="signout" element={<SignOut />} />
          <Route path=":user_id" element={<Mypage />} />
        </Route>
        <Route path="modal_test" element={<ModalTest />} />
      </Route>
    </Routes>
  );
};

export default IndexRouter;
