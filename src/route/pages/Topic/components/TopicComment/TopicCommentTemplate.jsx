import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTopicState } from "../../../../../Context";
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

const TopicCommentTemplate = () => {
  const topic_id = useParams().topic_id;
  const topic = useTopicState()[topic_id];
  const comments = topic.comments;
  return (
    <TopicCommentTemplateBlock>
      {comments.map((comment) => (
        <CommentContents
          key={comment.commentId}
          topic_id={topic_id}
          comment={comment}
        />
      ))}
    </TopicCommentTemplateBlock>
  );
};

export default TopicCommentTemplate;
