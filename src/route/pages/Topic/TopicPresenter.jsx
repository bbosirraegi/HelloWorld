import React from "react";
import styled from "styled-components";
import TopicDetail from "./TopicDetail";
import TopicPreview from "./TopicPreview";

const TopicDisplayBlock = styled.div`
  width: 100wh;
  height: 100vh;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopicPresenter = ({ topics }) => {
  return (
    <TopicDisplayBlock>
      {/* 각 아이템의 key는 현재시간 + id로 한다. */}
      {/* <TopicPreview topic={topics[0]} />
      <TopicPreview topic={topics[1]} />
      <TopicPreview topic={topics[2]} /> */}
      <TopicDetail topic={topics[2]} />
    </TopicDisplayBlock>
  );
};

export default TopicPresenter;
