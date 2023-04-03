import React from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fBase";

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

// on="topic_comment"
//           id={id}
//           reverse={reversal}
//           heart={heart}
//           userInfo={userInfo}
//           heartColor={heartColor}

const HeartBlock = ({
  comment,
  reverse,
  heart,
  userInfo,
  heartColor = "pink",
}) => {
  const id = useParams().id;
  const target = doc(dbService, "topics", id);
  const LikeToggle = async () => {
    if (heartColor === true) {
      comment.heart = comment.heart.concat([userInfo.nickname]);
    } else {
      comment.heart = comment.heart.filter((p) => p !== userInfo.nickname);
    }
    await updateDoc(target, { comment: comment });
    reverse();
  };
  console.log(heart);
  return (
    <HeartBlockTemplate onClick={LikeToggle}>
      {heartColor ? (
        <AiFillHeart style={{ color: "#ee5253", marginRight: "5px" }} />
      ) : (
        <AiOutlineHeart style={{ marginRight: "5px" }} />
      )}
      {comment.heart.length}
    </HeartBlockTemplate>
  );
};

export default HeartBlock;
