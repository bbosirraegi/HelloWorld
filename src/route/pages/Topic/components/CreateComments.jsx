import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbService, storageService } from "fBase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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
  topic,
  on = "",
  comment_id = "",
  placeholder = "",
}) => {
  /* state */
  const [insertImage, setInsertImage] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [init, setInit] = useState(false);
  const id = useParams().id;
  /* hooks */
  const imgRef = useRef();
  const target = doc(dbService, "topics", id);
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

  //
  const addComment = async (e) => {
    e.preventDefault();
    if (imgFile) {
      //이미지 업로드
      const fileRef = ref(storageService, `comments/id/${v4()}`);
      const response = await uploadString(fileRef, imgFile, "data_url");
      const result = await getDownloadURL(response.ref);
      setImgFile(result);
    }
    const newComment = {
      com_id: v4(),
      userInfo: {
        nickname: userObj.displayName,
        profile: userObj.profile,
      },
      comments: commentInput,
      isRoot: true,
      reply: [],
      imgUrl: imgFile,
      heart: [],
    };
    await updateDoc(target, { comments: [...topic.comments, newComment] });
    setCommentInput("");
  };
  /* hook*/

  /* render */
  return (
    <CommentsTemplate>
      <div style={{ marginRight: "10px" }}>
        <Avatar
          imgUrl={userObj ? userObj.profile : "/image/user.png"}
          size="40px"
        />
      </div>
      <Form onSubmit={addComment}>
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
        <SendButton>
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
