import React from "react";
import styled from "styled-components";
import TopicContentsTemplate from "./TopicContentsTemplate";
import TopicUnitPart from "./TopicUnitPart";
import FeedBack from "../components/FeedBack";
import CreateComments from "../components/CreateComments";
import TopicCommentTemplate from "../components/TopicComment/TopicCommentTemplate";

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
  width: calc(100% / 5);
  height: 100%;
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
  /* 임시지정 */
  const bookmark = 10;

  return (
    <TopicDetailTemplate>
      <ImageTemplate>
        {images.map((id) => (
          <Image src={`/image/${id}`} />
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
      <TopicCommentTemplate comments={comments} />
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
        commentId: 0,
        responseTo: { user: "root", preNum: null },
        userInfo: {
          nickname: "두근두근한 치즈피자",
          profile: "/image/temp.jpg",
        },
        date: "2023년 3월 15일 수 22:32",
        comment: "다시 가고 싶다ㅠㅠ",
        imgUrl: "/image/vietnam/v_food_6.jpg",
        heart: 3,
      },
      {
        commentId: 1,
        responseTo: { user: "두근두근한 치즈피자", preNum: 0 },
        userInfo: {
          nickname: "이불 속에 파묻힌 햄스터",
          profile: "/image/hamster.jpg",
        },
        date: "2023년 3월 15일 수 22:35",
        comment: "저두요ㅠㅠ",
        imgUrl: "/image/vietnam/v_food_7.jpg",
        heart: 3,
      },
    ],
    isMarked: true,
  },
};

export default TopicDetail;
