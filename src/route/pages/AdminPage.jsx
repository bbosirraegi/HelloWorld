import { dbService } from "fBase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
  background-color: goldenrod;
  height: 100px;
  display: flex;
  flex-direction: row;
`;

const PreviewImage = styled.div`
  width: calc(100% / 5);
  aspect-ratio: 1/1;
  background-color: ${(props) => props.color};
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

  //토픽 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "topics"), {
        id: v4(),
        createdAt: Date.now(),
        title: title,
        contents: contents,
        isMarked: ["admin"],
      });
      setTitle("");
      setContents("");
    } catch (error) {
      console.log(`Error adding Document: `, error);
    }
  };
  // 토픽들 firestore에서 가져오기
  // const getTopics = async () => {
  //   const dbTopics = await getDocs(collection(dbService, "topics"));
  //   // console.log(dbTopics);
  //   //토픽 data에 접근하기 - 이용해서, topic state에 넣기
  //   // dbTopics.forEach((doc) => console.log(doc.data()));
  //   dbTopics.forEach((doc) => {
  //     // data구조를 object로 만들어주기
  //     const topicObject = {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //     setTopics((prev) => [topicObject, ...prev]);
  //   });
  //   console.log(topics);
  // };
  /* Hooks */
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
          <div>이미지 추가하기</div>
          <input
            type="file"
            multiple
            accept="image/*"
            name="topicImages"
            id="inputFile"
            style={{ display: "none" }}
          />
        </label>
        <PreviewTemplateBlock>
          <PreviewImage color="red">1</PreviewImage>
          <PreviewImage color="orange">2</PreviewImage>
          <PreviewImage color="yellow">3</PreviewImage>
          <PreviewImage color="green">4</PreviewImage>
          <PreviewImage color="blue">5</PreviewImage>
        </PreviewTemplateBlock>
        <SubmitBtnTemplate>
          <SubmitBtn type="submit" value="제출하기" />
        </SubmitBtnTemplate>
      </AdminForm>
      <div>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h4>{topic.title}</h4>
            <span>{topic.contents}</span>
          </div>
        ))}
      </div>
    </AdminFormTemplate>
  );
};

export default AdminPage;
