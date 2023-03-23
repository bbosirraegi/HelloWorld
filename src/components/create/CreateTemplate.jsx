import React, { useState } from "react";
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

// 백그라운드 클릭하면 정말 나가시겠습니까? 모달 띄우기
const RUSureModalBlock = styled.div`
  width: 280px;
  height: 150px;

  z-index: 9999; // 제일 상단

  position: fixed;

  background: white;
  border-radius: 20px; /* 테두리 둥글게 */
  box-shadow: 0px 20px 50px 20px rgba(40, 40, 40, 0.18); /* rgba: 투명도 설정 */

  overflow: hidden;

  text-align: center;
`

const RUSureModalList = styled.div`
  margin-top: 20px;
  font-weight: bold;
`

const RUSureButtonsBlock = styled.div`
  display: flex;
  padding: 10px;
`
const RUSureButton = styled.button`
  width: calc(100%/2);
  height: 50px;
  margin: 10px 5px;
  border-radius: 8px; /* 테두리 둥글게 */
  border:1px solid gray;
  color: black;
  background: white;
  font-size: 15px;
  :hover {
    background-color: #2e86de;
    color: white;
    border: #2e86de;
  }
`

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
  position: fixed;
  // 모달창은 fixed 사용해주기?

  background: white;
  border-radius: 20px; /* 테두리 둥글게 */
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15); /*rgba: 투명도 설정*/

  overflow: hidden;
`;



// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
// setCreate props는 Header에서 받아온다
function CreateTemplate({ children, setCreate }) {
  
  const [rusure, setRusure] = useState(false); //기존값 false
  const onRusure = () => setRusure(!rusure); //setRusure 을 true로 바꿔주면서 모달 보이게
  
  const onYes = () => setCreate(false);

  return (
    // (e) => e.stopPropagation() : 부모 요소에 적용되는 동작을 자식 요소에 주는 것을 방지
    <CreateOutsideBlock onClick={onRusure}>
      {rusure && (
          <RUSureModalBlock>
            <RUSureModalList>
              게시글 쓰기에서 벗어나시겠어요? <br/>
              작성된 내용은 모두 삭제됩니다
            </RUSureModalList>
            <RUSureButtonsBlock>
              <RUSureButton>취소</RUSureButton>
              <RUSureButton onClick={onYes}>확인</RUSureButton>
            </RUSureButtonsBlock>
          </RUSureModalBlock>
      )}
      <CreateTemplateBlock onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </CreateTemplateBlock>
    </CreateOutsideBlock>
  );
}

export default CreateTemplate;