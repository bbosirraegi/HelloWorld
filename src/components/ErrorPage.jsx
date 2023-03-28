import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPageTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonTemplate = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  height: 40px;
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  border: 1.5px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  color: white;
  font-size: 15px;
  margin-bottom: 10px;
  &:hover {
    background-color: transparent;
    color: ${(props) => props.color};
  }
`;

const ErrorPage = ({ msg }) => {
  const navigate = useNavigate();
  const onBtnClick = (e) => {
    const {
      target: { name },
    } = e;
    if (name === "home") {
      navigate("/");
    } else if (name === "prev") {
      navigate(-1);
    }
  };
  return (
    <ErrorPageTemplate>
      <img src="/image/danger.png" width="80px" height="80px" />
      <h3 style={{ fontSize: "30px" }}>오류가 발생했습니다!</h3>
      <div style={{ fontSize: "20px", marginBottom: "15px" }}>
        <span style={{ fontWeight: "bold" }}>사유: </span>
        <span style={{ color: "#e84118" }}>
          <u>{msg}</u>
        </span>
      </div>
      <ButtonTemplate>
        <Button color="#2e86de" name="home" onClick={onBtnClick}>
          홈으로
        </Button>
        <Button color="#9c88ff" name="prev" onClick={onBtnClick}>
          이전화면으로 돌아가기
        </Button>
      </ButtonTemplate>
    </ErrorPageTemplate>
  );
};

export default ErrorPage;
