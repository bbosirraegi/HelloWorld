import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components";
import { Topic, Main, Posts, SignIn, Mypage, SignOut } from "./pages";

const IndexRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/notification" element={<Topic />} />
        <Route path="/posts" element={<Posts />} />
        
        {/* 마이페이지 모달이 이동하는 링크(route) */}
        <Route path="/mypage/mypage" element={<Mypage />} />
        <Route path="/mypage/signin" element={<SignIn />} />
        <Route path="/mypage/signout" element={<SignOut />} />
      </Route>
    </Routes>
  );
};

export default IndexRouter;
