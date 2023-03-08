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


function CreateList({setCreate}) {

  //제출 버튼 클릭하면 input 박스에 적힌 내용이 Main(b 영역)에 들어가도록 구현하고 싶음
  //일단 onClick부터 설정해보고 있음 (아직 미완성)
  //todolist 참고하여 만들고 있기 때문에 Context를 만들던지, Context 없이 진행할지... 선택해야함
  //setCreate props는 layout/Header.jsx 에서 받아옵니당
  const onClick = (e) => {
    //제출 버튼 onClick 이벤트 발생했을 때 dispatch
    dispatch({
      list: {
        id: nextId.current,
        title: value,
        content: value
      }
    })
    setCreate(false); //닫아줘야하므로
    nextId.current += 1; //id 값 +1
  };

  return (
    <>
    {/* onClick 하면 input 박스에 적힌 내용이 main에 도출되도록 이벤트 주고 싶은데 좀 쉽게 전달하고 싶어서 Head와 List를 합쳤다 */}
    <CreateHeadBlock>
        <h2>글쓰기</h2>
        <CreateButton>제출</CreateButton>
    </CreateHeadBlock>
    <CreateListBlock>
      <input className='search-box' type="text" name="title" placeholder="제목" />
      <input type="text" name="content" placeholder="어떤 여행을 하고 오셨나요?" />
    </CreateListBlock>
    </>
  );
}

export default CreateList;