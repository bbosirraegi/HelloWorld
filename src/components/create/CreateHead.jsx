import React from "react";
import styled from "styled-components";
// import CreateList from './CreateList';
import AiOutlineClose from "react-icons/ai";

// 글쓰기 헤드 부분 (x와 글쓰기 글자) 블록 스타일링
const CreateHeadBlock = styled.div`
  display: flex;
  padding-bottom: 14px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e9ecef;
  position: relative;
`;

const TitleBlock = styled.div`
  font-size: 15px;
`;

const CreateButton = styled.button`
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 25px;
  cursor: pointer;
`;

// 부모요소를 position: relative;
// 자식요소를 position: absolute; 로 설정하면
// div 위에 div 겹칠 수 있다. (부모 기준으로 위치 결정하기 때문)
// relative : 요소 자기 자신을 기준으로 배치
// absolute : 부모(조상) 요소를 기준으로 배치
// 자세한 설명 : https://creamilk88.tistory.com/197

function CreateHead({ title }) {
  const closeCreate = () => setCreate(false);
  return (
    <CreateHeadBlock>
      <Close onClick={closeCreate}>
        <AiOutlineClose />
      </Close>
      <TitleBlock>{title}</TitleBlock>
      <CreateButton>제출</CreateButton>
    </CreateHeadBlock>
  );
}

export default CreateHead;
