import { useCommunityState } from "Context";
import React, { useState } from "react";
import styled from "styled-components";
import "../../css/besttopic.css";

// const BestBlock = styled.div`
//     display: flex;
//     felx: 1;
//     //padding
//     background: gray;
// `;

const BTContentBlock = styled.div`
  white-space: pre-wrap;
`;

function BestTopics() {
  /*
  const besttopics = useCommunityState();
  => Context의 state를 "얕은복사"해옴(깊은 복사라고 했었는데...헷갈렸네용)
  => 주소만 복사해오기 때문에, 한 곳이 변하면 모든 곳도 변하게 됨!
  => 따라서, 스프레드 연산자를 통해 "깊은복사"를 하도록 함으로써
  원래 데이터의 주소를 가져오는 것이 아닌 
  "값만" 가져오도록 하고 새로운 메모리 공간 확보하도록 함!
  
  우리는 state를 가져와, 랜덤으로 배열해 필터링하고자 함
  => state의 값만 복사해와
  => 랜덤 정렬하고
  => 3개의 data만 besttopics에 저장되도록 함
  => firebase랑 연결하기....! 지금은 context에서 받아오는 중
  */
  const besttopics = [...useCommunityState()];

  // 배열에서 무작위로 3개의 요소 추출하기
  // Math.random() 함수를 사용하여 배열을 무작위로 정렬
  // Math.random() : -1부터 1까지의 무작위 숫자 반환.
  // Math.random() - Math.random() : 이 값이 음수일 경우 sort() 메서드는 배열의 요소를 뒤집음. 즉 무작위로 요소 위치 섞는 효과가 있음.
  // slice() 메소드를 사용하여 첫 번째 요소부터 세 번째 요소까지 자르기
  const randomTopics = besttopics
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  // BestTopic.jsx 에서 randomTopics 설정해주니까 Main도 랜덤으로 바뀌어버림.... (사용 안하고 선언만 해줘도 냅~다 랜덤)
  // 근데 왜!!!???? randomTopics 선언과 이게 도대체 무슨 연관이 있는 거지???

  console.log(randomTopics);
  return (
    <div>
      <input
        className="search-box"
        type="text"
        name="title"
        placeholder="어떤 여행이 궁금하신가요?"
      />
      <p>베스트 게시글</p>
      <div className="topic-content-box">
        {/* 배열 보여주기 */}
        {randomTopics.map((community) => (
          <div key={community.id}>
            <div className="topic-content">{community.title}</div>
            <BTContentBlock>{community.content}</BTContentBlock>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestTopics;
