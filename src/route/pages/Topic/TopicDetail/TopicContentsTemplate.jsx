import React from "react";
import styled from "styled-components";

const ContentsTemplate = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid lightgray;
`;

const TopicContentsTemplate = ({ children }) => {
  return <ContentsTemplate>{children}</ContentsTemplate>;
};

export default TopicContentsTemplate;
