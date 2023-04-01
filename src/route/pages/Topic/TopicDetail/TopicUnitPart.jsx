import React, { useState } from "react";
import styled from "styled-components";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const FixedPart = styled.div`
  width: 100%;
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
  margin-bottom: 10px;
  font-size: 15px;
  color: #84817a;
`;

const MarkButton = styled.div`
  width: 5%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 20px;
`;

const TopicUnitPart = ({ topic }) => {
  const title = topic.title;
  const contents = topic.contents;
  const [isMarked, setIsMarked] = useState(topic.isMarked.length);
  const markToggle = (e) => {
    e.stopPropagation();
    setIsMarked(!isMarked);
  };
  return (
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
  );
};

export default TopicUnitPart;
