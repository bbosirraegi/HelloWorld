import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CreateComments from "../components/CreateComments";

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

const CommentFeedback = ({ heart }) => {
  const [addReply, setAddReply] = useState(false);
  const toAddReply = () => setAddReply(!addReply);
  return (
    <div>
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
      {addReply && <CreateComments />}
    </div>
  );
};

export default CommentFeedback;
