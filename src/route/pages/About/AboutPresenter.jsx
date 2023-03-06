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