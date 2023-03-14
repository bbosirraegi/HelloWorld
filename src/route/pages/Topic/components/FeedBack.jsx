import React from "react";
import styled from "styled-components";

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

const FeedBack = ({ num, des }) => {
  return (
    <Feedback>
      <Number>{num}</Number>
      <Unit>{des}</Unit>
    </Feedback>
  );
};

export default FeedBack;
