import React, { useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useTopicDispatch } from "../../../../Context";

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
  topic_id = "",
  comment_id = "",
  operate_in = "topic",
  nickname = "",
  profile = "image/user.png",
  placeholder = "",
}) => {
  /* state */
  const [insertImage, setInsertImage] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [comment, setComment] = useState("");
  /* hooks */
  const imgRef = useRef();

  /* context */
  const dispatch = useTopicDispatch();
  const addComment = () => {
    if (operate_in === "topic_detail") {
      dispatch({
        type: "ADD_COMMENT",
        paylaod: {
          topic_id: topic_id,
          com: {
            commentId: 1,
            userInfo: {
              nickname: nickname,
              profile: "/image/temp.jpg",
            },
            comment: comment,
            isRoot: true,
            reply: [],
            imgUrl: imgFile,
            heart: 0,
          },
        },
      });
    }
  };

  /* function */
  const toggleInsertImage = () => setInsertImage(!insertImage);
  const onCommentEnter = (e) => setComment(e.target.value);

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

  const createComment = (e) => {
    e.preventDefault();
    addComment();
    setComment("");
  };
  /* render */
  return (
    <CommentsTemplate>
      <div style={{ marginRight: "10px" }}>
        <Avatar imgUrl={"/image/temp_profile.jpg"} size="40px" />
      </div>
      <Form onSubmit={createComment}>
        <AttatchImage htmlFor="profileImg">
          <IoImageOutline />
          <input
            id="profileImg"
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={saveImgFile}
            style={{ display: "none" }}
          />
        </AttatchImage>
        <CommentsInput
          type="text"
          name="comment"
          onClick={toggleInsertImage}
          placeholder={placeholder}
          value={comment}
          onChange={onCommentEnter}
        />
        <SendButton onClick={createComment}>
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
