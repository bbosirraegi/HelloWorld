import React, { useState } from "react";
import styled from "styled-components";
import CreateComments from "../CreateComments";
import ReplyTemplate from "./ReplyTemplate";
import CommentContents from "./CommentContents";
import HeartBlock from "../HeartBlock";
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

/* 대댓글 토글 Block */
const ReplyTemplateBlock = styled.div`
  padding: 5px;
  font-size: 12px;
  color: #2e86de;
  display: flex;
  flex-direction: row;
`;

const CommentFeedback = ({ comment_id, heart, isRoot, author, reply = [] }) => {
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
  const replyLen = reply.length;

  /* render */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FeedbackBlock>
        {isRoot && (
          <AddToggle onClick={toAddReply}>
            {addReply ? "댓글 숨기기" : "댓글달기"}
          </AddToggle>
        )}
        <HeartBlock
          on="topic_comment"
          reverse={reversal}
          heart={heart}
          heartColor={heartColor}
        />
      </FeedbackBlock>
      {isRoot && (
        <div>
          {addReply && (
            <div>
              <CreateComments
                on="comment"
                comment_id={comment_id}
                placeholder={placeholder}
              />
              <ReplyTemplateBlock onClick={toShowReply}>
                {showReply ? (
                  <>
                    <VscTriangleDown style={{ marginRight: "5px" }} />
                    <div>답글 숨기기</div>
                  </>
                ) : (
                  <>
                    <VscTriangleUp style={{ marginRight: "5px" }} />
                    <div>답글 {replyLen}개 보기</div>
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
      )}
    </div>
  );
};

export default CommentFeedback;
