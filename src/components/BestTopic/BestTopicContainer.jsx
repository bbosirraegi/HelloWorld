// 고투헬팀 스켈레톤이라 일단 들고왔었는데.. 아마 안 쓸듯
// 컨테이너는 프리젠터를 임포트한다. 컨테이너에서 프리젠터로 프롭스 보내기 때문

import React, { useState } from 'react'
import BestTopicPresenter from './BestTopicPresenter'
// 프리젠터 임포트

const BestTopicContainer = () => {

    /* Router */

    /* State */
    const initialState = {
        title: "",
        content: ""
    }

    const [ testState, setTestState ] = useState(0);
    const [ contentInfo, setContentInfo ] = useState( initialState );

    /* Functions */
    const testfuncion = () => {

        setTestState( testState + 1 );

        console.log( "TESTSTATE : " + testState );
        
        console.log( "ContentInfo : " + contentInfo.title );
    }

    const testchange = e => {

        setContentInfo( { ...contentInfo, [e.target.name] : e.target.value } );
        console.log( "TITLE : " + contentInfo.title );
    }

    /* Hooks */
    
    /* Render */
    
    return (
        // 프리젠터에 프롭스 전달
        <BestTopicPresenter
            testfunction = { testfuncion }
            testchange = { testchange }
        />
    );
}

export default BestTopicContainer