import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CreateComments from "../CreateComments";
import ReplyTemplate from "./ReplyTemplate";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";

/* 댓글달기, 좋아요 template 블록 */
const FeedbackBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

/* 댓글달기 토글 */
const AddToggle = styled.div`
  cursor: pointer;
`;

/* 좋아요 블록 */
const HeartBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 15px;
`;

/* 좋아요 버튼 */
const HeartBtnBlock = styled.div`
  margin-right: 5px;
  display: flex;
`;

/* 대댓글 토글 Block */
const ReplyTemplateBlock = styled.div`
  padding: 5px;
  font-size: 12px;
  color: #2e86de;
  display: flex;
  flex-direction: row;
`;

const ReplyToggle = styled.div`
  margin-left: 5px;
`;

const CommentFeedback = ({ comment }) => {
  const [addReply, setAddReply] = useState(false);
  const [reply, setReply] = useState(false);
  const replyToggle = () => setReply(!reply);
  const toAddReply = () => setAddReply(!addReply);
  const replyNum = "0";
  const heart = comment.heart;
  const author = comment.userInfo.nickname;
  const placeholder = `${author}님에게 댓글 달기`;
  return (
    <>
      <FeedbackBlock>
        <AddToggle onClick={toAddReply}>
          {addReply ? "댓글 숨기기" : "댓글 달기"}
        </AddToggle>
        <HeartBlock>
          <HeartBtnBlock>
            {heart ? (
              <AiFillHeart style={{ color: "#ee5253" }} />
            ) : (
              <AiOutlineHeart />
            )}
          </HeartBtnBlock>
          <div>{heart}</div>
        </HeartBlock>
      </FeedbackBlock>
      {addReply && <CreateComments placeholder={placeholder} />}
      <ReplyTemplateBlock onClick={replyToggle}>
        {reply ? <VscTriangleUp /> : <VscTriangleDown />}
        <ReplyToggle>
          {!reply ? "답글 숨기기" : `답글 ${replyNum}개 보기`}
        </ReplyToggle>
      </ReplyTemplateBlock>
      {/* 수정 필요!! */}
      {reply && <ReplyTemplate comment={comment} />}
    </>
  );
};

export default CommentFeedback;
