import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopicPreview from "./TopicPreview";
import ModalTemplate from "components/Modal/ModalTemplate";
import ModalHeader from "components/Modal/ModalHeader";
import ModalUserInfo from "components/Modal/ModalUserInfo";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { dbService } from "fBase";
import { v4 } from "uuid";
import moment from "moment/moment";
import "moment/locale/ko";

const TopicDisplayBlock = styled.div`
  width: 100wh;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopicCreateBlock = styled.div`
  background-color: #ecf0f1;
  width: 80%;
  font-size: 13px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const RecommentBtn = styled.button`
  width: 70px;
  height: 80%;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  color: white;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const ModalContentsTemplateBlock = styled.div`
  height: 460px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ModalUserInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalSubjectInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 20px;
  margin-bottom: 10px;
  ::placeholder {
    font-size: 20px;
    color: #bdc3c7;
  }
`;

const ModalContentsInput = styled.textarea`
  width: 100%;
  height: 330px;
  resize: none;
  border: none;
  outline: none;
  font-size: 15px;
  ::placeholder {
    font-size: 15px;
    color: #bdc3c7;
  }
`;

const TopicPresenter = ({ userObj }) => {
  /* state */
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);

  /* variable */
  const navigate = useNavigate();
  let profileImg = "https://t1.daumcdn.net/cfile/tistory/99891B485AA0B33012";
  let nickname = "로그인하지 않은 사용자";
  let isAdmin = false;
  if (userObj) {
    isAdmin = userObj.role;
    nickname = userObj.displayName;
    profileImg = userObj.profile;
  }
  const setCreate = () => {
    userObj && setShowModal(!showModal);
  };

  /* function */
  const AdminMode = () => {
    navigate("/admin");
  };

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onCloseModal = () => {
    setShowModal(!showModal);
    setSubject("");
    setContent("");
  };

  //data 가져오기
  useEffect(() => {
    const previews = query(collection(dbService, "topics"));
    onSnapshot(previews, (snapshot) => {
      const previewArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(previewArr);
    });

    {
      topics.length > 10 && setTopics(topics.slice(0, 10));
    }
  }, []);

  const submit = async () => {
    // topic 추천 data 입력하기
    const date = moment().utc(true).format("YYYY[.]MM[.]D ddd HH:mm:ss");
    try {
      await addDoc(collection(dbService, "topic_recommend"), {
        topic_id: v4(),
        createAt: Date.now(),
        date: date,
        author: nickname,
        profile: profileImg,
        subject: subject,
        content: content,
      });
      alert("추천 완료!");
      setSubject("");
      setContent("");
    } catch (error) {
      console.log("오류 발생 :(", error);
    }
    onCloseModal();
  };
  console.log(topics);
  return (
    <TopicDisplayBlock>
      {/* 각 아이템의 key는 현재시간 + random로 한다. */}
      {topics.map((topic) => (
        <TopicPreview uid={userObj.uid} key={topic.id} topic={topic} />
      ))}
      {/* <CreateTemplate /> */}
      {/* 토픽 추천하기*/}
      <TopicCreateBlock>
        <div>여행자들과 함께 공유하고 싶은 새로운 토픽이 있으신가요?</div>
        <RecommentBtn color="#2e86de" onClick={setCreate}>
          토픽 추천
        </RecommentBtn>
      </TopicCreateBlock>
      {isAdmin && (
        <TopicCreateBlock>
          <div>관리자 모드</div>
          <RecommentBtn onClick={AdminMode} color="#9c88ff">
            ON
          </RecommentBtn>
        </TopicCreateBlock>
      )}
      {showModal && (
        <ModalTemplate closeModal={onCloseModal}>
          <ModalHeader
            title="토픽 추천하기"
            submit={submit}
            closeModal={onCloseModal}
          />
          <ModalContentsTemplateBlock>
            <ModalUserInfo imgUrl={profileImg} nickname={nickname} />
            <ModalSubjectInput
              type="text"
              placeholder="더 공유하고 싶은 토픽 주제를 입력해 주세요."
              value={subject}
              onChange={onSubjectChange}
            />
            <ModalContentsInput
              placeholder="공유하고 싶은 이유가 있다면 아래의 양식에 맞춰 알려주세요. &#13;&#10;검토 결과를 알림으로 일주일 내에 안내해 드립니다. &#13;&#10; 1.간단한 자기소개 &#13;&#10; 2.여행자들과 함께 공유하고 싶은 내용"
              value={content}
              onChange={onContentChange}
            />
          </ModalContentsTemplateBlock>
        </ModalTemplate>
      )}
    </TopicDisplayBlock>
  );
};

export default TopicPresenter;
