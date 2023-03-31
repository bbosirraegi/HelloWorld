import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillNotification,
  AiOutlineNotification,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  MdInsertComment,
  MdOutlineInsertComment,
  MdNotifications,
  MdNotificationsNone,
} from "react-icons/md";
import CreateList from "components/create/CreateList";
import CreateTemplate from "../create/CreateTemplate";
import MypagemTemplate from "../mypage-m/MypagemTemplate";
import MypagemList from "../mypage-m/MypagemList";
import Avatar from "route/pages/Topic/components/Avatar";

function Header({ userObj, refreshUser, isLoggedIn }) {
  const [create, setCreate] = useState(false); // 모달관리, 기본값 false
  const onCreate = () => setCreate(!create); // create 기존값 반전
  // 글쓰기 클릭하면 글쓰기 창 켜지게 (true)

  const [mypage, setMypage] = useState(false); //모달관리, 기본값 false
  const onMypage = () => {
    setMypage(!mypage);
  }; //mypage 기존값 반전
  // 마이페이지 클릭하면 마이페이지 창 켜지게 (true)
  const activeStyle = {
    display: "flex",
    color: "#2E86DE",
    textDecoration: "none",
  };

  const iconDisActive = { display: "none" };
  const iconAcitve = { display: "flex" };
  return (
    <div className="a-container">
      <div className="a-header">
        <Link to="/">
          <img src="/image/logo.png" width="70px" height="80px" />
        </Link>
      </div>
      <div className="a-navi">
        {/* NAVI */}
        {/* NavLink를 두 개를 만들고 active 상황에 따라 보이게/안보이게 설정해 토글되는 효과를 보여준다. */}
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : iconDisActive)}
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <AiFillHome />
          </div>
          <div>홈</div>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? iconDisActive : iconAcitve)}
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <AiOutlineHome />
          </div>
          <div>홈</div>
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : iconDisActive)}
          to="/topic"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <MdInsertComment />
          </div>
          토픽
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? iconDisActive : iconAcitve)}
          to="/topic"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <MdOutlineInsertComment />
          </div>
          토픽
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : iconDisActive)}
          to="/notification"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <MdNotifications />
          </div>
          알림
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? iconDisActive : iconAcitve)}
          to="/notification"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <MdNotificationsNone />
          </div>
          알림
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : iconDisActive)}
          to="/posts"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <AiFillNotification />
          </div>
          공지사항
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? iconDisActive : iconAcitve)}
          to="/posts"
          className="a-navi-link"
        >
          <div className="a-navi-icon">
            <AiOutlineNotification />
          </div>
          공지사항
        </NavLink>
        <div onClick={onCreate} className="a-navi-create">
          <AiOutlinePlusCircle />
          글쓰기
        </div>
        {/* 모달창 만들기 */}
        {create && (
          <CreateTemplate setCreate={setCreate}>
            {/* CreateTemplate 컴포넌트 내부에서 X클릭 시(closeCreate),
                    setCreate을 props로 전달한다.(false 된다)*/}
            {/* <CreateHead /> */}
            <CreateList setCreate={setCreate} />
          </CreateTemplate>
          // <ModalTest />
        )}
      </div>
      {mypage && (
        <MypagemTemplate setMypage={setMypage}>
          {/* 얘도 모달임 */}
          <MypagemList refreshUser={refreshUser} isLoggedIn={isLoggedIn} />
        </MypagemTemplate>
      )}
      <div onClick={onMypage} className="a-mypage">
        <Avatar
          imgUrl={userObj ? userObj.profile : "/image/user.png"}
          size="40px"
        />
      </div>
    </div>
  );
}

export default Header;
