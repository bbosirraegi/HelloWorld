import React from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";

/* 좋아요 블록 */
const HeartBlockTemplate = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 15px;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const HeartBlock = ({ on = "", reverse, heart = 0, heartColor = "pink" }) => {
  const topic_id = useParams().topic_id;

  return (
    <HeartBlockTemplate onClick={reverse}>
      {heartColor ? (
        <AiFillHeart style={{ color: "#ee5253", marginRight: "5px" }} />
      ) : (
        <AiOutlineHeart style={{ marginRight: "5px" }} />
      )}
      {heart}
    </HeartBlockTemplate>
  );
};

export default HeartBlock;
