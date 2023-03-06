import React from 'react';
import styled from 'styled-components';
// import CreateList from './CreateList';

// 글쓰기 헤드 부분 (x와 글쓰기 글자) 블록 스타일링
// scss문법을 쓰고 싶어서... 일단 놔뒀는데 나중에 css 로 옮겨줄 것
const CreateHeadBlock = styled.div`
    display: flex;
    // padding-top: 12px;
    padding-bottom: 14px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e9ecef;
    position: relative;

    // scss 문법
    h2 {
        margin: 0; 
        font-size: 17px;
        color: #343a40;
    }
    
`;

const CreateButton = styled.button`
    position: absolute;
    margin-left: 80%;
`;

// 부모요소를 position: relative;
// 자식요소를 position: absolute; 로 설정하면
// div 위에 div 겹칠 수 있다. (부모 기준으로 위치 결정하기 때문)
// relative : 요소 자기 자신을 기준으로 배치
// absolute : 부모(조상) 요소를 기준으로 배치
// 자세한 설명 : https://creamilk88.tistory.com/197


function CreateHead() {

  return (
    <CreateHeadBlock>
        <h2>글쓰기</h2>
        <CreateButton>제출</CreateButton>
    </CreateHeadBlock>
  )
}

export default CreateHead;