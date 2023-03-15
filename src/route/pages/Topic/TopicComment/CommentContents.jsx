import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Profile from "../components/Profile";
import CommentFeedback from "./CommentFeedback";

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
const CommentContents = ({ comment }) => {
  // const userInfo = comments.userInfo
  // console.log(comment);
  const userInfo = comment.userInfo;
  const img = comment.imgUrl;
  const date = comment.date;
  const text = comment.comment;
  const heart = comment.heart;
  return (
    <CommentTemplateBlock>
      <AvatarBlock>
        <Avatar size="30px" imgUrl={userInfo.profile} />
      </AvatarBlock>
      <CommentBlock>
        <CommentInfo>
          <Profile nickname={userInfo.nickname} />
          <div
            style={{ marginLeft: "5px", marginRight: "5px", color: "#ced6e0" }}
          >
            ·
          </div>
          <div style={{ color: "lightgray" }}>{date}</div>
        </CommentInfo>
        {img && <CommentImg img={img} />}
        <CommentTextBlock>{text}</CommentTextBlock>
        <CommentFeedback heart={heart} />
      </CommentBlock>
    </CommentTemplateBlock>
  );
};

export default CommentContents;
