// 토픽 미리보기!
import React, { useState } from "react";
import styled from "styled-components";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CreateTemplate from "../../../components/create/CreateTemplate";

const PreviewTemplateBlock = styled.div`
  width: 85%;
  height: 130px;
  border-radius: 10px;
  background-color: #2e86de;

  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const PreviewImageBlock = styled.div`
  width: 30%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const PreviewContentBlock = styled.div`
  width: 70%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-family: SUIT-Regular;
`;

const ContentTitleBlock = styled.div`
  font-size: 0.8em;
  font-weight: bold;
`;

const FeedbackBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentsCount = styled.div`
  font-size: 0.5em;
  font-weight: lighter;
`;

const BookmarkButton = styled.div``;

const TopicPreview = ({ topic }) => {
  const title = topic.title;
  /* preview image는 각 토픽의 첫번째 이미지로 지정 */
  const previewImage = `/image/${topic.images[0]}`;
  /* 의견 수 */
  const feedbacks = topic.comments.length;
  /* 북마크 토글 */
  const [isMarked, setIsMarked] = useState(topic.isMarked);
  const onClick = (e) => {
    e.stopPropagation();
    setIsMarked(!isMarked);
  };

  /* 토픽 미리보기 클릭 시 화면이동 */
  const navigate = useNavigate();

  return (
    <PreviewTemplateBlock onClick={() => navigate(`${topic.id}`)}>
      <PreviewImageBlock imageUrl={previewImage} />
      <PreviewContentBlock>
        <ContentTitleBlock>{title}</ContentTitleBlock>
        <FeedbackBlock>
          <ContentsCount>{feedbacks}개의 의견 보기</ContentsCount>
          <BookmarkButton onClick={onClick}>
            {isMarked ? <BsFillBookmarkFill /> : <BsBookmark />}
          </BookmarkButton>
        </FeedbackBlock>
      </PreviewContentBlock>
    </PreviewTemplateBlock>
  );
};

export default TopicPreview;
