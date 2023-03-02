import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import AboutPresenter from './AboutPresenter'

const AboutContainer = () => {
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
    <AboutPresenter info={info} handleInfo={handleInfo} />
  )
}

export default AboutContainer

