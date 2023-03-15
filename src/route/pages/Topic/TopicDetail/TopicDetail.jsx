import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";

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

const FeedbackPart = styled.div`
  width: 100%;
  padding: 10px 15px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const TopicDetail = ({ topic }) => {
  const images = topic.images;
  const comments = topic.comments;
  const bookmark = 10; /* 임시지정 */
  return (
    <TopicDetailTemplate>
      <ImageTemplate>
        {images.map((id) => (
          <img
            style={{ width: "136px", height: "100%" }}
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
        <CreateComments />
      </TopicContentsTemplate>
    </TopicDetailTemplate>
  );
};

TopicDetail.defaultProps = {
  topic: {
    id: 0,
    title: "베트남에 먹으러 가는 사람들 모여",
    contents: "베트남에 먹으러 가는 사람?\n 나다 싶으면 일단 댓글달자",
    images: [
      "vietnam/v_food_1.jpg",
      "vietnam/v_food_2.jpg",
      "vietnam/v_food_3.jpg",
      "vietnam/v_food_4.jpg",
      "vietnam/v_food_5.jpg",
    ],
    comments: [
      {
        userInfo: {},
        date: { year: 2023, month: 3, day: 14, hour: 21, minute: 2 },
        comment: "다시 가고 싶다ㅠㅠ",
        imgUrl: "/image/vietnam/v_food_6.jpg",
        comments: [
          {
            userInfo: {},
            date: { year: 2023, month: 3, day: 14, hour: 21, minute: 7 },
            comment: "저두요ㅠㅠ",
            imgUrl: "/image/vietnam/v_food_7.jpg",
            comments: [],
            heart: 3,
          },
        ],
        heart: 3,
      },
    ],
    isMarked: true,
  },
};

export default TopicDetail;
