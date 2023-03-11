import React from "react";
import { Link } from "react-router-dom";

// 마이페이지 모달 리스트 부분에서는 마이페이지와 공지사항 로그아웃 갈 수 있음
// 각 링크에 대한 스타일링 되어있지 않기 때문에 보여지지 않음
// 근데.. 페이지가 새로 만들어지고 안에서 동작들을 해야하므로 index.jsx에서
// <Route path="/mypage/notice" element={<Notice />} /> 이런식으로 되어야하나?,,,
// 마즘!!! 위처럼 해주면 B부분에 나올 것임ㅎ.ㅎ
function MypagemList() {
  return (
    <div className="a-container">
      <Link to="/mypage/mypage" className="a-navi-link">
        마이페이지
      </Link>
      <Link to="/mypage/posts" className="a-navi-link">
        공지사항
      </Link>
      <Link to="/mypage/signin" className="a-navi-link">
        로그인
      </Link>
      <Link to="/mypage/signout" className="a-navi-link">
        로그아웃
      </Link>
    </div>
  );
}

export default MypagemList;
