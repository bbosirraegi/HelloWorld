import { fontSize } from "@mui/system";
import React from "react";
import styled from "styled-components";
import HeartBlock from "../Topic/components/HeartBlock";
import ModalUserInfo from "../Topic/components/Modal/ModalUserInfo";
import Profile from "../Topic/components/Profile";
import { useCommunityDispatch } from "./../../../Context";
import Avatar from './../Topic/components/Avatar';
import {SlPencil} from "react-icons/sl";
import {FiLink} from "react-icons/fi";
import {BsBookmark} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const CommunityItem = styled.div`
  display: flex;
  flex-direction: column;

  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2); /* rgba: 투명도 설정 */

  width: 80%;
  /* height: 300px; */
  min-height: 200px;
  max-height: 700px;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const CommunityItemHeader = styled.div`
  display: flex;
  padding: 15px;
  padding-bottom: 0%;
  /* border: 1px solid black; */
`

const CommunityTitle = styled.div`
  /* display: flex; */
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
`

const CommunityContent = styled.div`
  padding: 15px;
  padding-top: 0%;
  font-size: 15px;
`

const CommunityClicks = styled.div`
  display: flex;
  margin-top: auto;
  padding: 15px;
`


const MainHeart = styled.div`
  font-size: 12px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`

const MainComment = styled.div`
  font-size: 12px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`

const MainLink = styled.div`
  margin-left: auto;
  margin-right: 20px;
  font-size: 18px;
`

const MainBookmark = styled.div`
  font-size: 18px;
`

function MainItem({ title, content, id }) {

  // Test Input about Avata
  const profileImg = "https://t1.daumcdn.net/cfile/tistory/99891B485AA0B33012";
  const nickname = "사람1";

  // 커뮤니티 미리보기 클릭 시 화면이동
  const navigate = useNavigate();

  return (
    <CommunityItem>
      <CommunityItemHeader>
        {/* 아바타 크기(size) 를 바꾸고 싶은데... .어떻게 해줘야 할까요ㅠ */}
        <Avatar imgUrl={profileImg} />
        <div style={{display:"flex",flexDirection:"column"}}>
        <Profile nickname={nickname} />
        <div style={{fontSize:"12px", color:"gray"}}>
          위치
          ,
          시간
        </div>
        </div>
      </CommunityItemHeader>
      <div onClick={() => navigate(`${id}`)}>
        <CommunityTitle>{title}</CommunityTitle>
        <CommunityContent>{content}</CommunityContent>
      </div>
      <CommunityClicks>
        {/* <HeartBlock /> */}
        <MainHeart>
          <AiOutlineHeart style={{fontSize:"19px"}}/> 1
        </MainHeart>
        <MainComment>
          <SlPencil style={{fontSize:"18px"}}/>답변 남기기 2
        </MainComment>
        <MainLink><FiLink /></MainLink>
        <MainBookmark><BsBookmark /></MainBookmark>
      </CommunityClicks>
    </CommunityItem>
  );
}

export default MainItem;
