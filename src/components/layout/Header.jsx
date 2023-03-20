import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlinePlusCircle } from "react-icons/ai";
import { MdInsertComment, MdNotifications } from "react-icons/md";
import CreateList from "../create/CreateList";
import CreateTemplate from "../create/CreateTemplate";
import MypagemTemplate from "../mypage-m/MypagemTemplate";
import MypagemList from "../mypage-m/MypagemList";
// import CreateHead from '../create/CreateHead';
import ModalTest from './../../route/pages/Topic/components/Modal/index';

function Header() {
  const [create, setCreate] = useState(false); // 모달관리, 기본값 false
  const onCreate = () => setCreate(!create); // create 기존값 반전
  // 글쓰기 클릭하면 글쓰기 창 켜지게 (true)

  const [mypage, setMypage] = useState(false); //모달관리, 기본값 false
  const onMypage = () => setMypage(!mypage); //mypage 기존값 반전
  // 마이페이지 클릭하면 마이페이지 창 켜지게 (true)

  return (
    <div className="a-container">
      <div className="a-header">
        <Link to="/">HelloWorld</Link>
      </div>
      <div className="a-navi">
        {/* NAVI */}
        <Link to="/" className="a-navi-link">
          <AiFillHome />홈
        </Link>
        <Link to="/topic" className="a-navi-link">
          <MdInsertComment />
          토픽
        </Link>
        <Link to="/notification" className="a-navi-link">
          <MdNotifications />
          알림
        </Link>
        <Link to="/posts" className="a-navi-link">
          <MdNotifications />
          공지사항
        </Link>
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
          <MypagemList />
        </MypagemTemplate>
      )}
      <div onClick={onMypage} className="a-mypage">
        Mypage
        {/* 얘도 모달임 */}
      </div>
    </div>
  );
}

export default Header;
