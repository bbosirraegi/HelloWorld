import React from "react";
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

  // a.id - b.id : 첫 번째 요소의 id 값(a.id)에서 두 번째 요소의 id 값(b.id)을 뺀 결과를 반환 
  // 만약 a.id가 b.id보다 작으면 음수가 되어 정렬 순서에서 a 요소가 b 요소보다 앞에 위치
  // a.id가 b.id보다 크면 양수가 되어 정렬 순서에서 a 요소가 b 요소보다 뒤에 위치
  // a.id와 b.id가 같다면 0을 반환하여 순서를 유지
  //const sortedCommunitys = communitys.sort((a, b) => a.id - b.id); // id 순서대로 정렬
  // 근데 BestTopic.jsx 에서 randomTopics 설정해주고 여기서 sortedCommunitys 설정해주면 둘 다 sortedCommunitys 만 적용됨
  // 도대체 왜 ...

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
