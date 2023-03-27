import React from "react";
import styled from "styled-components";

//마이페이지-모달 줄여서 Mypagem
const MypagemTemplateBlock = styled.div`
  width: 200px;
  height: 150px;
  //모달창은 px 로 설정!

  /* 최상단 위치 */
  z-index: 999999;

  // 모달창 만들기 위해 자식 포지션 absolute or fixed
  // 1단 모달은 fixed로 설정
  // position: absolute;
  position: fixed;

  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3); /* rgba: 투명도 설정 */

  left: 10%;
  bottom: 15%;

  display: flex;
  flex-direction: column; /* 위에서 아래 방향(컬럼 방향) 설정 */

  padding: 10px;

  /* 말풍선 꼬리 */
  .tail {
    width: 20px;
    background-color: #ffff;
    height: 20px;
    border-radius: 4px;
    box-shadow: -2px 2px rgb(178 178 178 / 0.3);
    transform: rotate(-45deg);
    position: absolute;
    bottom: -9px;
    left: 94px;
    z-index: 2;
  }
`;

// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
// setCreate props는 Header에서 받아온다
function MypagemTemplate({ children }) {
  return (
    <MypagemTemplateBlock>
      {children}
      <div className="tail"></div>
    </MypagemTemplateBlock>
  );
}

export default MypagemTemplate;
