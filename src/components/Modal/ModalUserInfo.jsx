import React from "react";
import Avatar from "../../route/pages/Topic/components/Avatar";
import Profile from "../../route/pages/Topic/components/Profile";
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
