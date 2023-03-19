import React from "react";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

const ModalHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 5px 10px;
  border-bottom: 1px solid #bdc3c7;
`;

const ModalCloseBtn = styled.div`
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 25px;
  cursor: pointer;
`;

const TitleBlock = styled.div`
  fontsize: "12px";
`;

const SubmitBtn = styled.button`
  padding: 5px 10px;
  width: 60px;
  height: 30px;
  border-radius: 50px;
  border: none;
  background-color: #2e86de;
  color: white;
  font-size: 10px;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const ModalHeader = ({ closeModal, onSubmitRecommend, title }) => {
  console.log(onSubmitRecommend());
  return (
    <ModalHeaderBlock>
      <ModalCloseBtn onClick={closeModal}>
        <GrFormClose />
      </ModalCloseBtn>
      <TitleBlock>{title}</TitleBlock>
      <SubmitBtn onClick={onSubmitRecommend}>작성완료</SubmitBtn>
    </ModalHeaderBlock>
  );
};

export default ModalHeader;
