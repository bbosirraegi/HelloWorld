import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useTopicDispatch, useTopicState } from "../../../../Context";
import { useParams } from "react-router-dom";

/* 댓글 추가 부분을 감싸는 전체 부분 */
const CommentsTemplate = styled.div`
  height: 40px;
  display: flex;
  margin-bottom: 5px;
  padding: 10px;
  align-items: center;
`;

/* 이미지 첨부하고, 댓글 추가하는 form style */
const Form = styled.form`
  height: 30px;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 50px;
  background-color: white;
`;

/* image 첨부 아이콘 style */
const AttatchImage = styled.label`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;

/* 댓글 입력창 style */
const CommentsInput = styled.input`
  height: 22px;
  display: flex;
  flex: 1;
  outline: none;
  border: none;
`;

/* 댓글 추가 버튼 아이콘 */
const SendButton = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #2e86de;

  &:hover {
    cursor: pointer;
  }
`;

/* 이미지 preview */
const ImagePreview = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50px;
  background: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const CreateComments = ({
  userObj,
  on = "",
  comment_id = "",
  placeholder = "",
}) => {
  /* state */
  const [insertImage, setInsertImage] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const topic_id = parseInt(useParams().topic_id);
  /* hooks */
  const imgRef = useRef();
  /* context */
  const state = useTopicState();
  const dispatch = useTopicDispatch();
  /* function */
  const commentEnter = (e) => setCommentInput(e.target.value);
  const toggleInsertImage = () => setInsertImage(!insertImage);

  /* 이미지 업로드 input의 onChange */
  /* 참고 : https://velog.io/@hye_rin/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B3%A0-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0 */
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const addComment = () => {
    const [TARGET_TOPIC] = state.filter((topic) => topic.id === topic_id);
    if (on === "topic_detail") {
      const newComment = [
        ...TARGET_TOPIC.comments,
        {
          commentId: 3,
          userInfo: {
            nickname: "관리자",
            profile: "/image/hamster.jpg",
          },
          reply: [],
          comment: commentInput,
          isRoot: true,
          imgUrl: imgFile,
          heart: 0,
        },
      ];
      // 새로운 댓글 배열 dispatch 해주기
      dispatch({ type: "ADD_COMMENT", id: topic_id, comments: newComment });
    } else if (on === "comment") {
      // 2. 토픽의 comment 가져오기
      const [TARGET_COMMENT] = TARGET_TOPIC.comments.filter(
        (comment) => comment.commentId === comment_id
      );
      // 3. 새로운 대댓글 배열 만들기
      const newReply = [
        ...TARGET_COMMENT.reply,
        {
          commentId: 4,
          userInfo: {
            nickname: "방황하는 다람쥐",
            profile: "/image/squirrel.jpg",
          },
          comment: commentInput,
          isRoot: false,
          imgUrl: imgFile,
          heart: 0,
        },
      ];
      //4. 새로운 comments 배열 생성하기
      const new_comments = TARGET_TOPIC.comments.map((item) =>
        item.commentId === comment_id ? { ...item, reply: newReply } : item
      );
      ///5. 새로운 comments 배열 dispatch
      dispatch({ type: "ADD_REPLY", id: topic_id, comments: new_comments });
    } else {
      throw new Error("THIS MODE IS UNVALID!🙄");
    }
    setCommentInput("");
    setImgFile("");
  };

  const createComment = (e) => {
    e.preventDefault();

    addComment();
  };

  /* render */
  return (
    <CommentsTemplate>
      <div style={{ marginRight: "10px" }}>
        <Avatar
          imgUrl={userObj ? userObj.profile : "/image/user.png"}
          size="40px"
        />
      </div>
      <Form onSubmit={userObj ? createComment : false}>
        <AttatchImage htmlFor="profileImg">
          <IoImageOutline />
          {userObj && (
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={saveImgFile}
              style={{ display: "none" }}
            />
          )}
        </AttatchImage>
        <CommentsInput
          type="text"
          name="comment"
          onClick={toggleInsertImage}
          placeholder={placeholder}
          value={commentInput}
          onChange={commentEnter}
        />
        <SendButton onClick={userObj ? createComment : false}>
          <RiSendPlane2Fill />
        </SendButton>
      </Form>
      {insertImage && (
        <ImagePreview
          imgUrl={imgFile ? imgFile : "/image/previewImg.png"}
          alt="프리뷰 이미지"
        />
      )}
    </CommentsTemplate>
  );
};

export default CreateComments;
