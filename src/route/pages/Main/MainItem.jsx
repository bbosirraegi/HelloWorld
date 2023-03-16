import React from 'react'
import styled from 'styled-components';
import { useCommunityDispatch } from './../../../Context';


const CommunityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3); /* rgba: 투명도 설정 */

  width: 80%;
  height: 300px;

  margin-top: 20px;
  margin-bottom: 20px;
`;

function MainItem({ title, content }) {
    // const dispatch = useCommunityDispatch();

    return (
        <CommunityItem>
            <div>{title}</div>
            <div>{content}</div>
        </CommunityItem>
    )
}

export default MainItem