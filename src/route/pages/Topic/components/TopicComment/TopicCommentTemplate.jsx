import React from "react";
import styled from "styled-components";
import CommentContents from "./CommentContents";
import CommentFeedback from "./CommentFeedback";

/* 댓글에 들어가는 모든 컴포넌트를 모아주는 블록 */
const TopicCommentTemplateBlock = styled.div`
  width: 85%;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TopicCommentTemplate = ({ comments }) => {
  const heart = comments[0].heart;
  return (
    <TopicCommentTemplateBlock>
      <CommentContents comment={comments[0]} />
    </TopicCommentTemplateBlock>
  );
};

export default TopicCommentTemplate;
