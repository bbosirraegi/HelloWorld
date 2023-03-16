import React, { useState } from "react";
import styled from "styled-components";

const ReplyTemplateBlock = styled.div`
  background-color: tomato;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

/* context 구현 다음에 해줄 것 */
const ReplyTemplate = () => {
  return (
    <ReplyTemplateBlock>
      <div>~대댓글~</div>
    </ReplyTemplateBlock>
  );
};

export default ReplyTemplate;
