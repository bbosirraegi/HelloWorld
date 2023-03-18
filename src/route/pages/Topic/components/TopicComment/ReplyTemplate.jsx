import React, { useState } from "react";
import styled from "styled-components";

const ReplyTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

/* context 구현 다음에 해줄 것 */
const ReplyTemplate = ({ children }) => {
  return <ReplyTemplateBlock>{children}</ReplyTemplateBlock>;
};

export default ReplyTemplate;
