import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";
import TopicCommentTemplate from "../components/TopicComment/TopicCommentTemplate";
import { useParams } from "react-router-dom";
import { useTopicDispatch, useTopicState } from "../../../../Context";

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

const TopicDetail = () => {
  const topics = useTopicState();
  const topic_id = useParams().topic_id;
  const topic = topics[topic_id];
  const images = topic.images;
  const comments = topic.comments;
  const commentsLen = comments.length;

  /* context */

  /* 임시지정 */
  const bookmark = 10;
  const nickname = "test";
  const profile = "image/temp_profile.jpg";

  return (
    <TopicDetailTemplate>
      <ImageTemplate>
        {images.map((id) => (
          <Image
            key={Math.floor(Math.random() * 100)}
            divide={images.length}
            src={`/image/${id}`}
          />
        ))}
      </ImageTemplate>
      <TopicContentsTemplate>
        <TopicUnitPart topic={topic} />
        <FeedbackPart>
          <FeedBack num={comments.length} des={"댓글"} />
          <FeedBack num={bookmark} des={"북마크"} />
        </FeedbackPart>
        <CreateComments
          topic_id={topic_id}
          operate_in="topic_detail"
          nickname={nickname}
          profile={profile}
          placeholder="여행자님의 의견을 듣고 싶어요!"
        />
      </TopicContentsTemplate>
      {commentsLen ? <TopicCommentTemplate /> : null}
    </TopicDetailTemplate>
  );
};

export default TopicDetail;
