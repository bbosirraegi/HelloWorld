import React from "react";
import styled from "styled-components";
import CommentContents from "./CommentContents";

/* 댓글에 들어가는 모든 컴포넌트를 모아주는 블록 */
const TopicCommentTemplateBlock = styled.div`
  width: 90%;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TopicCommentTemplate = ({ comments }) => {
  return (
    <TopicCommentTemplateBlock>
      {comments.map((comment) => (
        <CommentContents key={comment.commentId} comment={comment} />
      ))}
    </TopicCommentTemplateBlock>
  );
};

export default TopicCommentTemplate;
