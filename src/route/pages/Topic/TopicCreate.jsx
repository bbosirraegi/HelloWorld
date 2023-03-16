import React, { useState } from "react";
import styled from "styled-components";

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
`;

const RecommentBtn = styled.button`
  width: 70px;
  height: 80%;
  border-radius: 5px;
  border: none;
  background-color: #2e86de;
  color: white;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const TopicCreate = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <TopicCreateBlock>
      <div>여행자들과 함께 공유하고 싶은 새로운 토픽이 있으신가요?</div>
      <RecommentBtn>토픽 추천</RecommentBtn>
    </TopicCreateBlock>
  );
};

export default TopicCreate;
