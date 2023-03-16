import React, { useState } from "react";
import styled from "styled-components";
import CreateTemplate from "../../../components/create/CreateTemplate";
import TopicCreate from "./TopicCreate";
import TopicPreview from "./TopicPreview";

const TopicDisplayBlock = styled.div`
  width: 100wh;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopicCreateBlock = styled.div`
  background-color: #ecf0f1;
  width: 80%;
  font-size: 13px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const RecommentBtn = styled.button`
  width: 70px;
  height: 80%;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  color: white;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const TopicPresenter = ({ topics }) => {
  const [showModal, setShowModal] = useState(false);
  const isAdmin = true;
  return (
    <TopicDisplayBlock>
      {/* 각 아이템의 key는 현재시간 + id로 한다. */}
      <TopicPreview topic={topics[0]} />
      <TopicPreview topic={topics[1]} />
      <TopicPreview topic={topics[2]} />
      {/* <CreateTemplate /> */}
      {/* 토픽 추천하기*/}
      {/* <CreateTemplate /> */}
      <TopicCreateBlock>
        <div>여행자들과 함께 공유하고 싶은 새로운 토픽이 있으신가요?</div>
        <RecommentBtn color="#2e86de">토픽 추천</RecommentBtn>
      </TopicCreateBlock>
      {isAdmin && (
        <TopicCreateBlock>
          <div>관리자 모드</div>
          <RecommentBtn color="#9c88ff">토픽 추가</RecommentBtn>
        </TopicCreateBlock>
      )}
    </TopicDisplayBlock>
  );
};

export default TopicPresenter;
