import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";
import TopicCommentTemplate from "../components/TopicComment/TopicCommentTemplate";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "fBase";
import LoadingPage from "LoadingPage";
import { v4 } from "uuid";
import { useTopicContext } from "App";

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

const TopicDetail = ({ userObj, topic }) => {
  /* State */
  const [topics, setTopic] = useState(null);
  const [init, setInit] = useState(false);

  /* Variable */
  // const id = useParams().id;
  const param = useParams();
  const id = param.id;
  const on = "topic";
  const target = topic.filter((tp) => tp.id === id)[0];
  let comments = [];
  const commentsLen = comments.length;

  const topic_id = target.topic_id;
  const resultFromDb = async (result) => {
    const querySnapshot = await getDocs(result);
    querySnapshot.forEach((doc) => setTopic(doc.data()));
    setInit(true);
  };

  useEffect(() => {
    const topicRef = collection(dbService, "topics");
    // 검색쿼리
    const result = query(topicRef, where("topic_id", "==", topic_id));
    //getDocs() 메서드로 쿼리 결과 값 가져오기
    // useEffect에선 async...await 쓰면 안됨!
    // 사용해야 할 땐, 함수를 따로 만들어줄 것...!
    resultFromDb(result);
  }, [topic_id]);

  /* Function */
  /* id로 검색해 토픽 받아오기  */

  return target ? (
    <TopicDetailTemplate>
      <ImageTemplate>
        {target.images.map((id) => (
          <Image key={v4()} divide={target.images.length} src={id} />
        ))}
      </ImageTemplate>
      <TopicContentsTemplate>
        <TopicUnitPart topic={target} />
        <FeedbackPart>
          <FeedBack num={target.comments.length} des={"댓글"} />
          <FeedBack num={target.isMarked.length} des={"북마크"} />
        </FeedbackPart>
        <CreateComments
          userObj={userObj}
          topic={target}
          on={on}
          placeholder={
            userObj ? "여행자님의 의견을 듣고 싶어요!" : "로그인 해주세요."
          }
        />
      </TopicContentsTemplate>
      {target.comments ? (
        <TopicCommentTemplate comments={target.comments} />
      ) : null}
    </TopicDetailTemplate>
  ) : (
    <LoadingPage />
  );
};

export default TopicDetail;
