import React from "react";
import styled from "styled-components";
import { useTopicDispatch } from "../../../../../Context";
import Avatar from "../Avatar";
import Profile from "../Profile";
import CommentFeedback from "./CommentFeedback";
import TopicCommentTemplate from "./TopicCommentTemplate";

/* 댓글 영역 template */
const CommentTemplateBlock = styled.div`
  padding: 10px 15px;
  display: flex;
  min-height: 80px;
  flex-direction: row;
`;

/* Avatar 영역 block */
const AvatarBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

/* 댓글 정보, text 영역 block */
const CommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Sepearator = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  color: #ced6e0;
`;

/* 댓글 정보 블록 */
const CommentInfo = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

/* 댓글 내 이미지 블록 */
const CommentImg = styled.div`
  background-color: #70a1ff;
  width: 110px;
  border-radius: 5px;
  aspect-ratio: 1/1;
  margin: 5px;
  background: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

/* 댓글 내용 블록 */
const CommentTextBlock = styled.div`
  width: 100%;
  min-height: 30px;
  font-size: 14px;
  color: #1e272e;
`;

// 댓글 컨텐츠 컴포넌트
const CommentContents = ({ topic_id, comment }) => {
  const userInfo = comment.userInfo;
  const img = comment.imgUrl;
  const date = comment.date;
  const text = comment.comment;
  const isRoot = comment.isRoot;
  const heart = comment.heart;
  const reply = comment.reply;
  const commentId = comment.commentId;

  // topic_id로 topic 찾고 -> isRoot이면, comments에, 아니면 comments의 reply에 저장하기

  return (
    <CommentTemplateBlock>
      <AvatarBlock>
        <Avatar size="30px" imgUrl={userInfo.profile} />
      </AvatarBlock>
      <CommentBlock>
        <CommentInfo>
          <Profile nickname={userInfo.nickname} />
          <Sepearator>·</Sepearator>
          <div style={{ color: "lightgray" }}>{date}</div>
        </CommentInfo>
        {img && <CommentImg img={img} />}
        <CommentTextBlock>{text}</CommentTextBlock>
        <CommentFeedback
          topic_id={topic_id}
          heart={heart}
          isRoot={isRoot}
          commentId={commentId}
          author={userInfo.nickname}
          reply={reply}
        />
      </CommentBlock>
    </CommentTemplateBlock>
  );
};

export default CommentContents;
