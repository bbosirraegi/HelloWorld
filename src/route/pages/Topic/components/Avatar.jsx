import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Profile from "./Profile";

/* Avatar 이미지 & 크기 고정하기 */
const AvatarImage = styled.div`
  height: ${(props) => props.size};
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

// props로 user image 받아오기 => profile 페이지로 이동하기
const Avatar = ({ imgUrl = "/image/user.png", size = "30px" }) => {
  const navigate = useNavigate();
  const goToProfile = () => navigate("/");
  return (
    <>
      <AvatarImage imgUrl={imgUrl} onClick={goToProfile} size={size} />
    </>
  );
};

export default Avatar;
