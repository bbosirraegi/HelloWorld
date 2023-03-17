import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CreateComments from "../CreateComments";
import ReplyTemplate from "./ReplyTemplate";
import CommentContents from "./CommentContents";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { useParams } from "react-router-dom";

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
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
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

const CommentFeedback = ({ heart, isRoot, author, reply }) => {
  /* State */
  const [addReply, setAddReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [heartColor, setHeartColor] = useState(false);
  /* function */
  const toAddReply = () => setAddReply(!addReply);
  const toShowReply = () => setShowReply(!showReply);
  const reversal = () => setHeartColor(!heartColor);

  /* variable */
  const placeholder = `${author}님에게 답글 달기`;

  /* render */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FeedbackBlock>
        {isRoot && (
          <AddToggle onClick={toAddReply}>
            {addReply ? "댓글 숨기기" : "댓글달기"}
          </AddToggle>
        )}
        <HeartBlock onClick={reversal}>
          {heartColor ? (
            <AiFillHeart style={{ color: "#ee5253", marginRight: "5px" }} />
          ) : (
            <AiOutlineHeart style={{ marginRight: "5px" }} />
          )}
          {heart}
        </HeartBlock>
      </FeedbackBlock>
      {addReply && (
        <div>
          <CreateComments placeholder={placeholder} />
          <ReplyTemplateBlock onClick={toShowReply}>
            {showReply ? (
              <>
                <VscTriangleDown style={{ marginRight: "5px" }} />
                <div>답글 숨기기</div>
              </>
            ) : (
              <>
                <VscTriangleUp style={{ marginRight: "5px" }} />
                <div>답글 {reply.length}개 보기</div>
              </>
            )}
          </ReplyTemplateBlock>
          {showReply && (
            <ReplyTemplate>
              {reply.map((one) => (
                <CommentContents key={one.commentId} comment={one} />
              ))}
            </ReplyTemplate>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentFeedback;
