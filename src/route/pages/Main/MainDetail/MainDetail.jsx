import React, { useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore';
import { dbService } from 'fBase';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MainDetail({children, userObj}) {

  const communityCollectionRef = collection(dbService, "community");

  const params = useParams();
  // console.log(params.uuid); uuid 
  
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getCommunity = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(communityCollectionRef);
    }
    getCommunity();
  },[]);

  return (
    <div key={params.uuid}>
      <div>Title</div>
      <div>Contents</div>
    </div>
  )
}

export default MainDetail