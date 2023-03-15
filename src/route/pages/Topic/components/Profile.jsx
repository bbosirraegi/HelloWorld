import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Name = styled.div`
  font-size: 13px;
  cursor: pointer;
`;

const Profile = ({ nickname }) => {
  const navigate = useNavigate();
  const goToProfile = () => navigate("/");
  return <Name onClick={goToProfile}>{nickname}</Name>;
};

export default Profile;
