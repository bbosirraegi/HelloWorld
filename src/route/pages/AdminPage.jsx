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
import {
  uploadString,
  ref,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import LoadingPage from "LoadingPage";
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
  // 제목 입력 값
  const [title, setTitle] = useState("");
  // 내용 입력 값
  const [contents, setContents] = useState("");
  // firestore에서 topic 가져오기
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
    // const imgArr = [];
    if (fileUrls) {
      // image 업로드
      let result = "";
      const fileLength = fileUrls.length;
      // map 함수의 경우 계속 동작을 하지 않아서 for문으로 접근하기
      // 성공!
      for (let i = 0; i < fileLength; i++) {
        // 이미지 파일에 대한 reference 생성하기
        const fileRef = ref(storageService, `admin/topic/${v4()}`);
        // 업로드 결과 받아오기 (reference, 파일, 형식)
        const response = await uploadString(fileRef, fileUrls[i], "data_url");
        // response의 ref를 통해 downloadURL 받아오기
        result = await getDownloadURL(response.ref);
        // 업로드된 이미지 담는 배열에 담아주기
        fileUrls[i] = result;
      }
    }

    //데이터 추가 : addDoc 사용
    //한 db 는 collection 들을 갖고 있고, 각 collection 은 document 들을 가짐
    try {
      await addDoc(collection(dbService, "topics"), {
        id: v4(),
        createdAt: Date.now(),
        title: title,
        contents: contents,
        isMarked: ["admin"],
        images: fileUrls,
      });

      alert("complete");
      setTitle("");
      setContents("");

      onClearAttachment();
    } catch (error) {
      console.log(`Error adding Document: `, error);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    // files : 이미지 '리스트'
    console.log(files);

    //결과 url들이 담길 배열
    const resultArr = [];

    // 현재 파일
    let attach;
    let attachLength = files.length;

    for (let i = 0; i < attachLength; i++) {
      let fileReader = new FileReader();
      attach = files[i];
      fileReader.onload = () => {
        resultArr[i] = fileReader.result;
        setFileUrls([...resultArr]);
      };
      fileReader.readAsDataURL(attach);
    }
  };

  /* Hooks */
  /* 토픽들 firestore에서 가져오기 */
  useEffect(() => {
    // 실시간 data 가져오기 - 이 방법으로 data 입력하기!
    // 페이지가 마운트 될 때 가져와지므로 useEffect 사용하는 것임!
    // topics 라는 콜렉션 가져와서 createAt 이라는 속성에 따라서 정렬. 그 결과를 q 에 넣는 것!
    const q = query(collection(dbService, "topics"), orderBy("createdAt"));
    // onSnapshot : 실시간으로 db 받아올 수 있게 해주는 것
    onSnapshot(q, (snapshot) => {
      const topicArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topicArr);
    });
  }, []);

  /* render */
  return (
    <>
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
        {/* <div>
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
      </div> */}
      </AdminFormTemplate>
    </>
  );
};

export default AdminPage;
