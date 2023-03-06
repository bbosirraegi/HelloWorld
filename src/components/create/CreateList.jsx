import React from 'react';
import styled from 'styled-components';

// 글쓰기 리스트 (헤드 뺀 나머지) 블록 스타일링
const CreateListBlock = styled.div`
  flex: 1; // 자신이 차지할 수 있는 모든 영역 차지
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; // 항목 많아지게 되면 스크롤바
  display: flex;
  flex-direction: column; //input 박스들 column 형태로 정렬
  /* background: gray; //사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function CreateList() {
//   const contents = useContentState();
  return (
    <CreateListBlock>
      <input className='search-box' type="text" name="title" placeholder="제목" />
      <input className='search-box' type="text" name="content" placeholder="어떤 여행을 하고 오셨나요?" />
    </CreateListBlock>
  );
}

export default CreateList;