// 고투헬팀 스켈레톤이라 일단 들고왔었는데.. 아마 안 쓸듯

import React from 'react'
import '../../css/besttopic.css'

const BestTopicPresenter = ( props ) => {

    const { testfunction, testchange } = props;

    return (
        <div>
            {/* UI 구성 */}
            {/* <p>검색 추가</p> */}
            <div>
                <input type="text" name="title" autoFocus placeholder="어떤 여행이 궁금하신가요?" onChange={testchange} />
            </div>
            <p>베스트 게시글</p>
            <div></div>
            {/* <div className="test">
                <button onClick={ testfunction } >wow</button>
                <input type="text" name="title" onChange={testchange} />
            </div> */}
        </div>
    );
}

export default BestTopicPresenter