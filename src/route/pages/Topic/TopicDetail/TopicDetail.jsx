import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";
import TopicCommentTemplate from "../components/TopicComment/TopicCommentTemplate";
import { useParams } from "react-router-dom";
import { useTopicState } from "../../../../Context";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "fBase";
import LoadingPage from "LoadingPage";
import { v4 } from "uuid";

const TopicDetailTemplate = styled.div`
  width: 100%;
  height: 100vh;
  white-space: pre-wrap;
  font-family: "SUIT-Regular";
  display: flex;
  flex-direction: column;
`;

const ImageTemplate = styled.div`
  width: 100%;
  height: 30%;
  margin: 0;
  padding: 0;
`;

const Image = styled.img`
  width: calc(100% / ${(props) => props.divide});
  height: 100%;
`;

const FeedbackPart = styled.div`
  width: 100%;
  padding: 10px 15px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const TopicDetail = ({ userObj }) => {
  /* State */
  const [topic, setTopic] = useState(null);
  const [init, setInit] = useState(false);

  /* Variable */
  const id = useParams().topic_id;

  const comments = [];
  const commentsLen = comments.length;
  const on = "topic_detail";
  let images = "";

  /* 임시지정 */
  let bookmark = [];

  const resultFromDb = async (result) => {
    const querySnapshot = await getDocs(result);
    querySnapshot.forEach((doc) => setTopic(doc.data()));
    setInit(true);
  };

  useEffect(() => {
    const topicRef = collection(dbService, "topics");
    // 검색쿼리
    const result = query(topicRef, where("topic_id", "==", id));
    //getDocs() 메서드로 쿼리 결과 값 가져오기
    // useEffect에선 async...await 쓰면 안됨!
    // 사용해야 할 땐, 함수를 따로 만들어줄 것...!
    resultFromDb(result);
  }, []);

  // console.log(topic.images);
  /* Function */
  /* id로 검색해 토픽 받아오기  */

  return init ? (
    <TopicDetailTemplate>
      <ImageTemplate>
        {topic.images.map((id) => (
          <Image key={v4()} divide={topic.images.length} src={id} />
        ))}
      </ImageTemplate>
      <TopicContentsTemplate>
        <TopicUnitPart topic={topic} />
        <FeedbackPart>
          <FeedBack num={comments.length} des={"댓글"} />
          <FeedBack num={topic.isMarked.length} des={"북마크"} />
        </FeedbackPart>
        <CreateComments
          userObj={userObj}
          on={on}
          placeholder={
            userObj ? "여행자님의 의견을 듣고 싶어요!" : "로그인 해주세요."
          }
        />
      </TopicContentsTemplate>
      {commentsLen ? <TopicCommentTemplate comments={comments} /> : null}
    </TopicDetailTemplate>
  ) : (
    <LoadingPage />
  );
};

export default TopicDetail;
