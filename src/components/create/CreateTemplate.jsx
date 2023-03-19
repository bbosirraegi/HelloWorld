import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

// 글쓰기 창 전체블록 스타일링
const CreateTemplateBlock = styled.div`
  width: 500px;
  height: 500px;
  // 모달창의 크기 설정은 calc() or px 단위 사용하기!

  /* 최상단 위치 */
  z-index: 999;

  // 모달창 만들기 위해 자식 포지션 absolute or fixed
  // 부모 포지션 설정 없이 자식 포지션 absolute 설정해주면 viewprot가 기준된다.
  // fixed = 부모포지션 없는 absolute (둘 다 뷰포트 기준)
  // 자세한 설명 : https://creamilk88.tistory.com/197
  // position: absolute;
  position: fixed;
  // 모달창은 fixed 사용해주기(?)
  // top: 10;

  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3); /* rgba: 투명도 설정 */

  top: 10%;
  left: 35%;

  display: flex;
  flex-direction: column; /* 위에서 아래 방향(컬럼 방향) 설정 */

  overflow: hidden;
`;

// 상단의 X 부분 (close)
const Close = styled.div`
  margin-right: auto;
  margin-left: 20px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
  }
`;

// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
// setCreate props는 Header에서 받아온다
function CreateTemplate({ children, setCreate }) {
  const closeCreate = () => setCreate(false);
  //setCreate 을 false로 바꿔주면서 창 닫히게

  return (
    <CreateTemplateBlock>
      <Close onClick={closeCreate}>
        <AiOutlineClose />
      </Close>
      {children}
    </CreateTemplateBlock>
  );
}

export default CreateTemplate;
