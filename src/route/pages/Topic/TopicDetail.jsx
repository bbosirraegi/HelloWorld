import React from "react";
import { useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import styled from "styled-components";

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

const ContentsTemplate = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
`;

const FixedPart = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const TextPart = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-weight: 100;
  margin: 0;
  margin-bottom: 20px;
  font-size: 15px;
  color: #84817a;
`;

const MarkButton = styled.div`
  width: 20%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 20px;
`;

const FeedbackPart = styled.div`
  width: 100%;
  padding: 10px 15px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const Feedback = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Number = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const Unit = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

const TopicDetail = ({ topic }) => {
  const title = topic.title;
  const contents = topic.contents;
  const images = topic.images;
  const comments = topic.comments;
  const bookmark = 10; /* 임시지정 */
  const [isMarked, setIsMarked] = useState(topic.isMarked);
  const markToggle = () => setIsMarked(!isMarked);
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
      <ContentsTemplate>
        <FixedPart>
          <TextPart>
            <Title>{title}</Title>
            <Description>{contents}</Description>
          </TextPart>
          <MarkButton onClick={markToggle}>
            {isMarked ? (
              <BsFillBookmarkFill style={{ color: "#2e86de" }} />
            ) : (
              <BsBookmark />
            )}
          </MarkButton>
        </FixedPart>
        <FeedbackPart>
          <Feedback>
            <Number>{comments.length}</Number>
            <Unit>댓글</Unit>
          </Feedback>
          <Feedback>
            <Number>{bookmark}</Number>
            <Unit>북마크</Unit>
          </Feedback>
        </FeedbackPart>
      </ContentsTemplate>
    </TopicDetailTemplate>
  );
};

export default TopicDetail;
