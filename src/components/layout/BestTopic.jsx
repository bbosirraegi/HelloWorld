import React, {useState} from 'react';
import styled from 'styled-components';
import '../../css/besttopic.css'

// const BestBlock = styled.div`
//     display: flex;
//     felx: 1;
//     //padding
//     background: gray;
// `;

const initialTopic = [
    {id: 0, title: "강원도 여행가기", content: "오늘은 강원도 여행을 가볼거에요"},
    {id: 1, title: "전라도 여행가기", content: "오늘은 전라도 여행을 가볼거에요"},
    {id: 2, title: "부산시 여행가기", content: "오늘은 부산시 여행을 가볼거에요"}
];


function BestTopics() {
    
    const [topics, topicState] = useState(initialTopic);

    return (
        <div>
            <input className='search-box' type="text" name="title" placeholder="어떤 여행이 궁금하신가요?" />
            <p>베스트 게시글</p>
            <div className='topic-content-box'>
                {topics.map(topic => (
                    <>
                        <div className='topic-content'>{topic.title}</div>
                        <div>{topic.content}</div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default BestTopics;