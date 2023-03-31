import React from "react";
import styled from "styled-components";

const LoadingTemplate = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ContentTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;
// 로딩 페이지
const LoadingPage = () => {
  const images = [
    "/image/loading/travel.gif",
    "/image/loading/plane.gif",
    "/image/loading/airplane.gif",
    "/image/loading/map.gif",
  ];
  return (
    <LoadingTemplate>
      <ContentTemplate>
        <img
          src={images[Math.floor(Math.random() * 3)]}
          width="150px"
          height="150px"
        />
        <div>Loading ···</div>
      </ContentTemplate>
    </LoadingTemplate>
  );
};

export default LoadingPage;
