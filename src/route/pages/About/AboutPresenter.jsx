// 고투헬 스켈레톤에 있던 것
// 같은 파일 내용(형식) Main 으로 이름 바꿈 (B,중앙 부분)

import React from 'react'
import AboutHeadline from './components/AboutHeadline'

const AboutPresenter = ({info, handleInfo}) => {
  
  const test = 1;
  const test2= 100000000000000;

  return (
    <div><AboutHeadline />{JSON.stringify(info)}</div>
  )
}

export default AboutPresenter