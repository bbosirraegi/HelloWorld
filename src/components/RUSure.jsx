import React, { useState } from 'react'
import styled from "styled-components";

// 모달 외부 영역
const OutsideBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9998; //제일 상단 바로 아래

  /* background-color: rgba(0, 0, 0, 0.8); */
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

function RUSure({onYes, onNo}) {
  
  return (
    <OutsideBlock>
        <RUSureModalBlock onClick={(e) => e.stopPropagation()}>
            <RUSureModalList>
                게시글 쓰기에서 벗어나시겠어요? <br/>
                작성된 내용은 모두 삭제됩니다
            </RUSureModalList>
            <RUSureButtonsBlock>
                <RUSureButton onClick={onNo}>취소</RUSureButton>
                <RUSureButton onClick={onYes}>확인</RUSureButton>
            </RUSureButtonsBlock>
        </RUSureModalBlock>
    </OutsideBlock>
  )
}

export default RUSure;