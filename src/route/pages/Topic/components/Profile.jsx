import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Name = styled.div`
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
`;

const Profile = ({ nickname, fontSize = "13px" }) => {
  const navigate = useNavigate();
  const goToProfile = () => navigate("/");
  return (
    <Name onClick={goToProfile} fontSize={fontSize}>
      {nickname}
    </Name>
  );
};

export default Profile;
