import { useCommunityState } from 'Context';
import React, {useState} from 'react';
import styled from 'styled-components';
import '../../css/besttopic.css'

// const BestBlock = styled.div`
//     display: flex;
//     felx: 1;
//     //padding
//     background: gray;
// `;


function BestTopics() {

    const besttopics = useCommunityState();

    // 배열에서 무작위로 3개의 요소 추출하기
    // Math.random() 함수를 사용하여 배열을 무작위로 정렬
    // Math.random() : -1부터 1까지의 무작위 숫자 반환.
    // Math.random() - Math.random() : 이 값이 음수일 경우 sort() 메서드는 배열의 요소를 뒤집음. 즉 무작위로 요소 위치 섞는 효과가 있음.
    // slice() 메소드를 사용하여 첫 번째 요소부터 세 번째 요소까지 자르기
    const randomTopics = besttopics.sort(() => Math.random() - Math.random()).slice(0, 3);

    // BestTopic.jsx 에서 randomTopics 설정해주니까 Main도 랜덤으로 바뀌어버림.... (사용 안하고 선언만 해줘도 냅~다 랜덤)
    // 근데 왜!!!???? randomTopics 선언과 이게 도대체 무슨 연관이 있는 거지???

    return (
        <div>
            <input className='search-box' type="text" name="title" placeholder="어떤 여행이 궁금하신가요?" />
            <p>베스트 게시글</p>
            <div className='topic-content-box'>
                {/* 배열 보여주기 */}
                {randomTopics.map((community) => (
                    <div key={community.id}>
                        <div className='topic-content'>{community.title}</div>
                        <div>{community.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BestTopics;