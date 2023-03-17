import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";
import TopicCommentTemplate from "../components/TopicComment/TopicCommentTemplate";
import { useParams } from "react-router-dom";
import { useTopicState } from "../../../../Context";

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
  const param = useParams().topic_id;
  const topic = topics[param];
  const images = topic.images;
  const comments = topic.comments;
  console.log("댓글수", comments);
  const commentsLen = comments.length;

  /* 임시지정 */
  const bookmark = 10;

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
        <CreateComments placeholder="여행자님의 의견을 듣고 싶어요!" />
      </TopicContentsTemplate>
      {commentsLen ? <TopicCommentTemplate comments={comments} /> : null}
    </TopicDetailTemplate>
  );
};

export default TopicDetail;
