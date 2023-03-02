// 중앙에 정렬된 흰색 박스를 보여주기

import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

//스타일링
const CreateTemplateBlock = styled.div`
  width: 500px;
  height: 600px;

  /* 최상단 위치 */
  z-index: 999;

  position: absolute;
  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3); /* rgba: 투명도 설정 */

  left: 30%;

//   margin-top: 0px;
//   margin-bottom: 32px;
  
  display: flex;
  flex-direction: column; /* 위에서 아래 방향(컬럼 방향) 설정 */
`;

const Close = styled.div`
  margin-right: auto;
  margin-left: 20px;
  margin-top: 15px;
//   color: #20c997;
  &:hover{
    cursor: pointer;
  }
`;

// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
function CreateTemplate({ children, setCreate }) {
  const closeCreate = () => setCreate(false); 
  //setCreate 을 false로 바꿔주면서 창 닫히게
  
  return (
    <CreateTemplateBlock>
      <Close onClick={closeCreate}>
        <AiOutlineClose/>
      </Close>
      {children}
    </CreateTemplateBlock>
  );
}

export default CreateTemplate;