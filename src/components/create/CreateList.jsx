import React, { useState, useRef } from "react";
import styled from "styled-components";
import MainPresenter from "../../route/pages/Main/MainPresenter";
import { useCommunityDispatch, useCommunityNextId } from "./../../Context";
import { AiOutlineClose } from "react-icons/ai";
import ModalUserInfo from "../../route/pages/Topic/components/Modal/ModalUserInfo";
import { Button } from "@mui/material";


// 글쓰기 헤드 부분 (제출 버튼과 글쓰기 글자) 블록 스타일링
const CreateHeadBlock = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 5px 5px 5px 10px;
  border-bottom: 1px solid #bdc3c7;
`;

const CreateButton = styled.button`
  position: absolute;
  right: 10px;
  width: 65px;
  height: 30px;
  border-radius: 50px;
  border: none;
  background-color: #2e86de;
  color: white;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

// 상단의 X 부분 (close)
const Close = styled.div`
  position: absolute;
  left: 10px;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
`;

// "글쓰기" 글자 부분
const TitleBlock = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 글쓰기 리스트 (헤드 뺀 나머지) 블록 스타일링
const CreateListBlock = styled.div`
  flex: 1; // 자신이 차지할 수 있는 모든 영역 차지
  padding: 0px 18px;
  display: flex;
  flex-direction: column; //input 박스들 column 형태로 정렬
`;

const CreateTitle = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  ::placeholder {
    font-size: 25px;
    color: gray;
  }
`

const CreateContents = styled.textarea`
  width: 100%;
  height: 330px;
  resize: none;
  border: none;
  outline: none;
  font-size: 18px;
  ::placeholder {
    font-size: 18px;
    color: gray;
  }
`

const UserInfoBlock = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 0%;
`

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center; /* 버튼들 중앙으로 */
  padding: 20px 10px;
`
const Buttons = styled.button`
  width: calc(100%/2);
  height: 120px;
  margin: 10px;
  border-radius: 8px; /* 테두리 둥글게 */
  border:1px solid #bdc3c7;
  background: white;
  font-size: 15px;
`

const BlaBla = styled.div`
  width: 100%;
  height: calc(100%/2);
  text-align: center;
  margin-top: 10px;
  color: gray;
`



// 부모요소를 position: relative;
// 자식요소를 position: absolute; 로 설정하면
// div 위에 div 겹칠 수 있다. (부모 기준으로 위치 결정하기 때문)
// relative : 요소 자기 자신을 기준으로 배치
// absolute : 부모(조상) 요소를 기준으로 배치
// 자세한 설명 : https://creamilk88.tistory.com/197

function CreateList({ setCreate }) {
  const [title, setTitle] = useState(""); //기본값 공백
  const [content, setContent] = useState(""); //기본값 공백

  // 아무것도 안 적었으면 title과 content 에 focus 하기 위함
  // DOM 노드나 다른 컴포넌트에 접근해서 조작하기 위함. handleClick에서는 useRef로 컴포넌트 접근에 사용한다.
  const titleRef = useRef(null); //초기값 null
  const contentRef = useRef(null);

  //제출 버튼 클릭하면 input 박스에 적힌 내용이 Main(b 영역)에 들어가도록 구현하고 싶음
  //일단 onClick부터 설정해보고 있음 (아직 미완성)
  //todolist 참고하여 만들고 있기 때문에 Context를 만들던지, Context 없이 진행할지... 선택해야함
  //setCreate props는 layout/Header.jsx 에서 받아옵니당
  const onClick = (e) => {
    e.preventDefault(); // 클릭 이벤트의 기본 동작 취소
    if (title === "") {
      titleRef.current.focus(); //title에 아무것도 없으면 focus
    } else if (content === "") {
      contentRef.current.focus(); // content에 아무것도 없으면 focus
    } else {
      //제출 버튼 onClick 이벤트 발생했을 때 dispatch
      dispatch({
        type: "CREATE",
        community: {
          id: nextId.current,
          title: title,
          content: content,
        },
      });
      setTitle(""); //공백처리
      setContent(""); //공백처리
      setCreate(false); //닫아줘야하므로
      nextId.current += 1; //id 값 +1
    }
  };

  const dispatch = useCommunityDispatch();
  const nextId = useCommunityNextId();
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);

  const closeCreate = () => setCreate(false);
  //setCreate 을 false로 바꿔주면서 창 닫히게


  // Test Input about Avata
  const profileImg = "https://t1.daumcdn.net/cfile/tistory/99891B485AA0B33012";
  const nickname = "사람1";

  //여행&정보 이야기 버튼 클릭했을 때
  const [chooseleft, setChooseleft] = useState(false); //여행&정보이야기 글쓰기 창 기본값 false
  const [chooseButtons, setChooseButtons] = useState(true);
  const onClickButtons = () => {
    setChooseleft(!chooseleft); //기존값 반전
    setChooseButtons(!chooseButtons);
  }


  return (
    <div>
      {/* onClick 하면 input 박스에 적힌 내용이 main에 도출되도록 이벤트 주고 싶은데 좀 쉽게 전달하고 싶어서(?) Head와 List를 합쳤다 */}
      <CreateHeadBlock>
        <Close onClick={closeCreate}>
          <AiOutlineClose />
        </Close>
        <TitleBlock>글쓰기</TitleBlock>
        {chooseleft && (<CreateButton onClick={onClick}>작성 완료</CreateButton>)}
      </CreateHeadBlock>

      {/* 버튼 클릭하면 사라지기 */}
      {chooseButtons && (
        <>
          <ButtonsBlock>
            <Buttons onClick={onClickButtons}>여행 & 정보 이야기</Buttons>
            <Buttons>질문 & 투표</Buttons>
          </ButtonsBlock>
          <BlaBla>
            여행과 관련된 이야기를 나눠주세요. <br/>
            혐오, 음란물 등 부적절한 내용을 남기지 말아주세요.
          </BlaBla>
        </>
      )}

      {/* 왼쪽 버튼 선택했을 때 나타나는 창 */}
      {chooseleft && (
        <>
          <UserInfoBlock>
            <ModalUserInfo imgUrl={profileImg} nickname={nickname} />
          </UserInfoBlock>
          
          <CreateListBlock>
            <CreateTitle
              title={title}
              className="search-box"
              type="text"
              name="title"
              placeholder="제목을 작성해 주세요"
              value={title}
              onChange={onChangeTitle}
              ref={titleRef}
            />
            <CreateContents
              content={content}
              type="text"
              name="content"
              placeholder="여행에 대한 자유로운 이야기를 작성해 주세요"
              value={content}
              onChange={onChangeContent}
              ref={contentRef}
            />
          </CreateListBlock>
        </>
      )}
    </div>
  );
}

export default CreateList;
