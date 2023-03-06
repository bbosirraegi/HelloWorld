import React from 'react'
import TopicHeadline from './components/TopicHeadline'

const TopicPresenter = ({info, handleInfo}) => {
  
  return (
    <div><TopicHeadline />{JSON.stringify(info)}</div>
  )
}

export default TopicPresenter