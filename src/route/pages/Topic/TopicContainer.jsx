import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import TopicPresenter from './TopicPresenter'

const TopicContainer = () => {
  /* Router */
  
  /* State */
  const [info, setInfo] = useState({id: -1, name: ''});
  
  /* Functions */
  const handleInfo = (val) => {
    setInfo(val);
  }

  /* Hooks */
  useEffect(() => {
    // API Call
    setInfo({
      id: 0,
      name: 'normal'
    });
  }, [])
  

  /* Render */
  return (
    <TopicPresenter info={info} handleInfo={handleInfo} />
  )
}

export default TopicContainer

