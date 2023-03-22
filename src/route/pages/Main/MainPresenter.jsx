import React from "react";
import MainHeadline from "./components/MainHeadline";
import styled from "styled-components";
import MainItem from "./MainItem";
import { useCommunityState } from "../../../Context";

const CommunityBlock = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 항목 많아지게 되면 스크롤바
  align-items: center;
  justify-content: center;
`;

function MainPresenter() {
  const communitys = useCommunityState();
  return (
    <CommunityBlock>
      {communitys.map((community) => (
        <MainItem // community 값 보내주기
          key={community.id} // key값 필수
          id={community.id}
          title={community.title}
          content={community.content}
        />
      ))}
    </CommunityBlock>
  );
}

export default MainPresenter;
