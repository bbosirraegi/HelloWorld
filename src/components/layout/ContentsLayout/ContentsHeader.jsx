import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
/* 페이지명을 띄울 수 있는 방법 물어보기... */

const ContentsHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let toggle = true;
  const pathName = location.pathname;
  let name = "";
  if (pathName === "/") {
    name = "커뮤니티";
    toggle = false;
  } else if (pathName.includes("topic")) {
    name = "토픽";
    toggle = true;
  } else if (pathName === "/notification") {
    name = "알림";
    toggle = true;
  } else if (pathName === "/posts") {
    name = "공지사항";
    toggle = true;
  } else if (pathName.includes("mypage")) {
    name = "마이페이지";
    toggle = true;
  } else if (pathName === "/admin") {
    name = "관리자 페이지";
    toggle = true;
  }
  return (
    <div className="contents_header">
      <div style={{ display: "flex", marginRight: "10px" }}>
        {toggle && <FiArrowLeft onClick={() => navigate(-1)} />}
      </div>
      <div>{name}</div>
    </div>
  );
};

export default ContentsHeader;
