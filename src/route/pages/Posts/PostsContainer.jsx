// 컨테이너는 프리젠터를 임포트한다. 컨테이너에서 프리젠터로 프롭스 보내기 때문

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import PostsPresenter from './PostsPresenter'

const PostsContainer = () => {
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
    <PostsPresenter />
  )
}

export default PostsContainer;
