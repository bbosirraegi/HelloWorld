import React from "react";
import Avatar from "../Avatar";
import Profile from "../Profile";
import styled from "styled-components";

const ModalUserInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalUserInfo = ({ imgUrl, nickname }) => {
  return (
    <ModalUserInfoBlock>
      <Avatar imgUrl={imgUrl} />
      <Profile nickname={nickname} />
    </ModalUserInfoBlock>
  );
};

export default ModalUserInfo;
