import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MainPresenter from "../../route/pages/Main/MainPresenter";
import { useCommunityDispatch, useCommunityNextId } from "./../../Context";
import { AiOutlineClose } from "react-icons/ai";
import ModalUserInfo from "../../route/pages/Topic/components/Modal/ModalUserInfo";


// 글쓰기 헤드 부분 (제출 버튼과 글쓰기 글자) 블록 스타일링
const CreateHeadBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 5px 10px;
  border-bottom: 1px solid #bdc3c7;
`;

const CreateButton = styled.button`
  padding: 5px 10px;
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
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
`;

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



// 부모요소를 position: relative;
// 자식요소를 position: absolute; 로 설정하면
// div 위에 div 겹칠 수 있다. (부모 기준으로 위치 결정하기 때문)
// relative : 요소 자기 자신을 기준으로 배치
// absolute : 부모(조상) 요소를 기준으로 배치
// 자세한 설명 : https://creamilk88.tistory.com/197

function CreateList({ setCreate }) {
  const [title, setTitle] = useState(""); //기본값 공백
  const [content, setContent] = useState(""); //기본값 공백

  //제출 버튼 클릭하면 input 박스에 적힌 내용이 Main(b 영역)에 들어가도록 구현하고 싶음
  //일단 onClick부터 설정해보고 있음 (아직 미완성)
  //todolist 참고하여 만들고 있기 때문에 Context를 만들던지, Context 없이 진행할지... 선택해야함
  //setCreate props는 layout/Header.jsx 에서 받아옵니당
  const onClick = (e) => {
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

  // 아무것도 안 적었으면 title과 content 에 focus
  const inputRef = useRef(null);
  useEffect(() => {
    if (title === "" || content === "") {
      inputRef.current.focus();
    }
  }, [title, content]);

  return (
    <div>
      {/* onClick 하면 input 박스에 적힌 내용이 main에 도출되도록 이벤트 주고 싶은데 좀 쉽게 전달하고 싶어서(?) Head와 List를 합쳤다 */}
      <CreateHeadBlock>
        <Close onClick={closeCreate}>
          <AiOutlineClose />
        </Close>
        <TitleBlock>글쓰기</TitleBlock>
        <CreateButton onClick={onClick}>작성 완료</CreateButton>
      </CreateHeadBlock>

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
          ref={inputRef}
        />
        <CreateContents
          content={content}
          type="text"
          name="content"
          placeholder="여행에 대한 자유로운 이야기를 작성해 주세요"
          value={content}
          onChange={onChangeContent}
        />
      </CreateListBlock>
    </div>
  );
}

export default CreateList;
