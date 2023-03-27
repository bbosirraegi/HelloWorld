import { getAuth } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// 마이페이지 모달 리스트 부분에서는 마이페이지와 공지사항 로그아웃 갈 수 있음
// 페이지가 새로 만들어지고 안에서 동작들을 해야하므로 index.jsx에서
// <Route path="/mypage/notice" element={<Notice />} /> 설정해줘야함!
// 위처럼 해주면 B부분에 나올 것임ㅎ.ㅎ
function MypagemList({ isLoggedIn }) {
  const auth = getAuth();
  const navigate = useNavigate();
  // 로그아웃
  const logout = () => {
    console.log("로그아웃!");
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="a-container">
      <Link to="/mypage/mypage" className="a-navi-link">
        <div style={{ display: "flex", alignItems: "center" }}>마이페이지</div>
      </Link>
      {isLoggedIn ? (
        <div className="a-navi-link" onClick={logout}>
          로그아웃
        </div>
      ) : (
        <Link to="/signin" className="a-navi-link">
          <div>로그인</div>
        </Link>
      )}
    </div>
  );
}

export default MypagemList;
