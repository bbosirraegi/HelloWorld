import { height, width } from "@mui/system";
import { dbService, storageService } from "fBase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { uploadString, ref, getStorage } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

const AdminFormTemplate = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;

const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  padding: 15px 10px;
`;

const TopicTitleInput = styled.input`
  width: 380px;
  height: 40px;
  border-radius: 40px;
  margin-bottom: 10px;
  outline: none;
  background-color: transparent;
  border: 1.6px solid #2e86de;
  padding-left: 10px;
`;

const TopicContentsInput = styled.textarea`
  width: 90%;
  resize: none;
  height: 150px;
  margin-bottom: 10px;
  outline: none;
  background-color: transparent;
  border: 1.6px solid #2e86de;
  border-radius: 10px;
  padding: 10px;
`;

const PreviewTemplateBlock = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
`;

const PreviewImage = styled.div`
  width: calc(100% / 5);
  aspect-ratio: 1/1;
  background: url(${(props) => props.fileUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const SubmitBtnTemplate = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.input`
  width: 60%;
  height: 40px;
  border-radius: 40px;
  margin-top: 15px;
  outline: none;
  border: none;
  background-color: #2e86de;
  color: white;
`;
const AdminPage = () => {
  /* state */
  // Document에 collection 추가하기
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [topic, setTopic] = useState("");
  // Data 가져올 페이지에 새로운 state 만들어주기
  const [topics, setTopics] = useState([]);
  // 이미지 urls
  const [fileUrls, setFileUrls] = useState(null);
  const target = doc(dbService, "topics", `${topic.id}`);
  /* function */
  const onTitleInput = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onContentsInput = (e) => {
    const {
      target: { value },
    } = e;
    setContents(value);
  };

  const onClearAttachment = () => setFileUrls(null);

  //토픽 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    //image업로드
    let fileUrl = "";
    
    // if (fileUrls) {
    //   let fileUrl = "";
    //   upload = fileUrls.map(async (fileUrl) => {
    //     const fileRef = ref(storageService, `admin/${v4()}`);
    //     const response = await uploadString(fileRef, fileUrl, "data_url");
    //     return response;
    //   });
    //   // 배열에서 map 내부 비동기 처리하기
    //   // 안해주면 넘어감.
    //   await Promise.all(upload);
    // }

    try {
      await addDoc(collection(dbService, "topics"), {
        id: v4(),
        createdAt: Date.now(),
        title: title,
        contents: contents,
        isMarked: ["admin"],
        // images: fileUrls,
      });
      setTitle("");
      setContents("");

      onClearAttachment();
    } catch (error) {
      console.log(`Error adding Document: `, error);
    }
  };

  const onFileChange = (e) => {
    // input file로 부터 이미지 파일 불러오기
    // files: 선택한 파일 개수
    const {
      target: { files },
    } = e;

    console.log(files);

    let attachUrls = [];
    let attach;
    let attachLength = files.length;
    if (attachLength == 1) {
      attachLength = 1;
    } else {
      alert("이미지는 1장까지만 첨부 가능합니다! 1장만 적용됩니다");
      attachLength = files.length;
    }

    //파일 여러 장 업로드 시...
    for (let i = 0; i < attachLength; i++) {
      let reader = new FileReader();
      attach = files[i];
      reader.onload = () => {
        attachUrls[i] = reader.result;
        setFileUrls([...attachUrls]);
      };
      reader.readAsDataURL(attach);
    }
  };

  /* Hooks */
  /* 토픽들 firestore에서 가져오기 */
  useEffect(() => {
    // 실시간 data 가져오기 - 이 방법으로 data 입력하기!
    const q = query(collection(dbService, "topics"), orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const topicArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topicArr);
    });
  }, []);

  const onDeleteClick = async () => {
    const ok = confirm("삭제하시겠습니까?");
    const storage = getStorage();
    const deleteRef = ref(storage, topics.images);

    if (ok) {
      console.log("삭제");
    }
  };
  /* render */
  return (
    <AdminFormTemplate>
      <AdminForm onSubmit={onSubmit}>
        <label htmlFor="title" style={{ marginBottom: "10px" }}>
          제목
        </label>
        <TopicTitleInput
          type="text"
          name="title"
          id="title"
          placeholder="토픽 제목을 입력해주세요!"
          value={title}
          onChange={onTitleInput}
        />
        <label htmlFor="contents" style={{ marginBottom: "10px" }}>
          토픽
        </label>
        <TopicContentsInput
          name="contents"
          maxLength={120}
          id="contents"
          placeholder="토픽 내용을 입력해주세요!"
          value={contents}
          onChange={onContentsInput}
        />
        <label htmlFor="inputFile">
          <div style={{ marginBottom: "10px" }}>이미지 추가하기</div>
          <input
            type="file"
            multiple
            accept="image/*"
            name="topicImages"
            id="inputFile"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </label>
        {fileUrls && (
          <PreviewTemplateBlock>
            {fileUrls.map((fileUrl) => (
              <PreviewImage key={v4()} fileUrl={fileUrl} />
            ))}
          </PreviewTemplateBlock>
        )}
        <SubmitBtnTemplate>
          <SubmitBtn type="submit" value="제출하기" />
        </SubmitBtnTemplate>
      </AdminForm>
      <div>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h4>{topic.title}</h4>
            <div>{topic.contents}</div>
            {topic.images.length && (
              <img src={topic.images[0]} width="100px" height="100px" />
            )}
            <button onClick={onDeleteClick}>삭제하기</button>
          </div>
        ))}
      </div>
    </AdminFormTemplate>
  );
};

export default AdminPage;
