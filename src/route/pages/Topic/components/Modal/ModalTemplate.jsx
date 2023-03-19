import React, { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";

const ModalOutsideBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBodyBlock = styled.div`
  background-color: white;
  position: absolute;
  width: calc(100% / 3);
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 999999;
`;

const ModalTemplate = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overflow:auto`);
  }, []);
  return (
    <ModalOutsideBlock onClick={closeModal}>
      <ModalBodyBlock onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </ModalBodyBlock>
    </ModalOutsideBlock>
  );
};

export default ModalTemplate;
