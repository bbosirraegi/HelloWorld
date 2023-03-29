import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../route/pages/Topic/components/Avatar";
import Profile from "../../route/pages/Topic/components/Profile";
import ModalHeader from "./ModalHeader";
import ModalTemplate from "./ModalTemplate";
import ModalUserInfo from "./ModalUserInfo";

const ModalContentsTemplateBlock = styled.div`
  height: 460px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ModalUserInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalSubjectInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 20px;
  margin-bottom: 10px;
  ::placeholder {
    font-size: 20px;
    color: #bdc3c7;
  }
`;

const ModalContentsInput = styled.textarea`
  width: 100%;
  height: 330px;
  resize: none;
  border: none;
  outline: none;
  font-size: 15px;
  ::placeholder {
    font-size: 15px;
    color: #bdc3c7;
  }
`;

const ModalTest = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onCloseModal = () => setCloseModal(!closeModal);
  const profileImg = "https://t1.daumcdn.net/cfile/tistory/99891B485AA0B33012";
  const nickname = "관리자";
  return (
    !closeModal && (
      <ModalTemplate closeModal={onCloseModal}>
        <ModalHeader title="제목" closeModal={onCloseModal} />
        <ModalContentsTemplateBlock>
          <ModalUserInfo imgUrl={profileImg} nickname={nickname} />
          <ModalSubjectInput
            type="text"
            placeholder="더 공유하고 싶은 토픽 주제를 입력해 주세요."
            value={subject}
            onChange={onSubjectChange}
          />
          <ModalContentsInput
            placeholder="공유하고 싶은 이유가 있다면 아래의 양식에 맞춰 알려주세요. &#13;&#10;검토 결과를 알림으로 일주일 내에 안내해 드립니다. &#13;&#10; 1.간단한 자기소개 &#13;&#10; 2.여행자들과 함께 공유하고 싶은 내용"
            value={content}
            onChange={onContentChange}
          />
        </ModalContentsTemplateBlock>
      </ModalTemplate>
    )
  );
};

export default ModalTest;
