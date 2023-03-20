import React, { useEffect } from "react";
import styled from "styled-components";


// 모달 외부 영역
const CreateOutsideBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 글쓰기 창 전체블록 스타일링
const CreateTemplateBlock = styled.div`
  width: calc(100% / 3.7);
  height: calc(100% / 1.5);
  // 모달창의 크기 설정은 calc() or px 단위 사용하기!

  /* 최상단 위치 */
  z-index: 999;

  // 모달창 만들기 위해 자식 포지션 absolute or fixed
  // 부모 포지션 설정 없이 자식 포지션 absolute 설정해주면 viewprot가 기준된다.
  // fixed = 부모포지션 없는 absolute (둘 다 뷰포트 기준)
  // 자세한 설명 : https://creamilk88.tistory.com/197
  position: absolute;
  // 모달창은 fixed 사용해주기

  background: white;
  border-radius: 20px; /* 테두리 둥글게 */
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15); /* rgba: 투명도 설정 */

  overflow: hidden;
`;



// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
// setCreate props는 Header에서 받아온다
function CreateTemplate({ children, setCreate }) {
  
  const closeCreate = () => setCreate(false);
  //setCreate 을 false로 바꿔주면서 창 닫히게

  return (
    // (e) => e.stopPropagation() : 부모 요소에 적용되는 동작을 자식 요소에 주는 것을 방지
    <CreateOutsideBlock onClick={closeCreate}>
      <CreateTemplateBlock onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </CreateTemplateBlock>
    </CreateOutsideBlock>
  );
}

export default CreateTemplate;