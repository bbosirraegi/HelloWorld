import { React, useState, useEffect } from "react";
import styled from "styled-components";
import MainItem from "./MainItem";
import { getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fBase";
import { addDoc, collection } from "firebase/firestore";

const CommunityBlock = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 항목 많아지게 되면 스크롤바
  align-items: center;
  justify-content: center;
`;

function MainPresenter() {
  // 여기다 추가해줍시당 헷갈렸군여
  // 넴 third도 지워줍시당
  /// 오우 async는 저기 넣어주는 겁미당
  // callback 함수 앞에! 함수 앞은 await!
  // 넴 좋아요 오우.. 아마 그렇게 선언하면 아아 아니군여 ㅋ\ㅋㅋㅋ그렇게 해도 될 것 같슴다
  // 넴 좋아요 오우.. 아마 그렇게 선언하면 아아 아니군여 ㅋ\ㅋㅋㅋ그렇게 해도 될 것 같슴다
  //먼가 이상해지고 있는 거 같애여
  // 앗 아님미다 그렇게 하는 것이 아님미다...AboutContainer
  // 이제 아까 말했었던 snapshot으로 실시간으로 불러오기를 해줘야지요
  //앗 그것은 왜 지우지요?! 넴ㅋㅋㅋ 아까 set 함수 안에 입력하는 것이 잘못됐었습미다
  //앗 필요없는 친구가 아니었나요!? 아핫..!
  // 앗 지금은 일단 order는 뺍시다 넴 좋아요 keep going
  // topicArr는 결과를 담는 배열이랍니다
  // 앗 똑같이 해봅씨다
  // 저렇게 하면 일단 모든 DATA를 가져오는 것이라
  // 오호.. 지금 그러면 모든 data 를 가져오고 있는 중인 것이군요
  // 아? 여기서 문제가 생겼던 건가여? 음
  // 넵 지금 상태에서는음
  // 어휴 정신이 없게 생긴 에러군여ㅋㅋㅋ 이게 data를 불러오는 것이지요?
  // 새로고침을 해보셨나여..? 어째서..! async awati가 사라졌는데 대체 왜...?
  // 넵 똑같은 에러가 뜹니당 .... ㅠㅠ...ㅠㅠㅠㅠ...
  // 혹시 애니데스크이라는 것 해볼 수 있나여
  // 넵넵 컴퓨터에 Anydesk 다운받으셔야해요 근데 ㅠㅠ 다운받구 제 서버로 들어올 수 있읍니다
  // 넴 해보지요ㅎㅎ
  // 앗 지금은 일단 order는 뺍시다 넴 좋아요 keep going
  // topicArr는 결과를 담는 배열이랍니다
  // 앗 똑같이 해봅씨다
  // 저렇게 하면 일단 모든 DATA를 가져오는 것이라
  // 오호.. 지금 그러면 모든 data 를 가져오고 있는 중인 것이군요
  // 아? 여기서 문제가 생겼던 건가여? 음
  // 넵 지금 상태에서는음
  // 어휴 정신이 없게 생긴 에러군여ㅋㅋㅋ 이게 data를 불러오는 것이지요?
  // 새로고침을 해보셨나여..? 어째서..! async awati가 사라졌는데 대체 왜...?
  // 넵 똑같은 에러가 뜹니당 .... ㅠㅠ...ㅠㅠㅠㅠ...
  // 혹시 애니데스크이라는 것 해볼 수 있나여
  // 넵넵 컴퓨터에 Anydesk 다운받으셔야해요 근데 ㅠㅠ 다운받구 제 서버로 들어올 수 있읍니다
  // 넴 해보지요ㅎㅎ
  const [communitylist, setCommunitylist] = useState([]);
  useEffect(() => {
    // 여기서 getDocs 를 사용하면 에러 뜨고 query 사용해야 잘 동작함 .......
    // 여기서 getDocs 를 사용하면 에러 뜨고 query 사용해야 잘 동작함 .......
    // query를 사용해야 실시간성으로 불러올 수 있는 것으로 판단됨
    // getDocs 는 비동기 함수이기 때문! => async await 필요
    // 쿼리는 동기 함수라 async await 필요 없음
    // orderBy: 정렬, desc : 오름차순. 최신것부터 불러오기
    const data = query(
      collection(dbService, "community"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(data, (snapshot) => {
      const communityArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // 넴 아니다 화면에 띄워줘 봅씨당!!
      // 넵넵!!
      // 오!!!!!!!!
      setCommunitylist(communityArr);
    });
  
  }, []);

  // 만약 a.id가 b.id보다 작으면 음수가 되어 정렬 순서에서 a 요소가 b 요소보다 앞에 위치
  // a.id가 b.id보다 크면 양수가 되어 정렬 순서에서 a 요소가 b 요소보다 뒤에 위치
  // a.id와 b.id가 같다면 0을 반환하여 순서를 유지
  //const sortedCommunitys = communitys.sort((a, b) => a.id - b.id); // id 순서대로 정렬
  // 근데 BestTopic.jsx 에서 randomTopics 설정해주고 여기서 sortedCommunitys 설정해주면 둘 다 sortedCommunitys 만 적용됨
  // 도대체 왜 ...
  // 넴 마쟈요
  // title content 정도만 불러와 볼까여
  // 넴 좋아요 이제 useEffect를 만들어 줍시당
  // 함수안에 넣지 않아도 됩미당 그냥 function MainPreseter 이라 적힌 곳 바로 위에 추가해줍시당
  // 넵넵! 아? 아니군여ㅋㅋㅋ 아? 헷갈리네 잠시만여
  return (
    <CommunityBlock>
      {/* 화면에 보여주기 위해 이곳을 만들어주었는데여 아하! ㅇ */}
      {/* 고냥 아래에다가 넣는 것이 더 좋을듯합니다 */}
      {/* 오우 바깥쪽 div는 안지워도 됩미 좋아요 넴 마쟈요 좋아좋아 테스트 해봅시다 */}
      {/* 그리고 prettire extension이 깔려있나용 아 이게 아닌가 */}
      {/* prettier, bracket pair color, 추천합미다 */}
      {/* 헉 글쿤요 익스텐션 먼저 깔아보겠읍니다 다운받았읍니닷*/}
      {/* 이제 저장하면 코드가 자동 정렬될 것임미당 짱 좋겠지여 그리고 괄호 짝도 표시해줍니당 한 번 해보세영 */}
      {/* ....! 신세계 */}
      {/* 선생님 그런데 에러가 떴는데 어케고쳐야할지 몰겟ㅂ읍니다.. */}
      {/* ...! 어떤 오류지요 */}
      {/* <div>
        {communitylist.map((communitys) => (
          <div key={communitys.uuid}>
            <h4>{communitys.title}</h4>
            <div>{communitys.content}</div>
          </div>
        ))}
      </div> */}
      {communitylist.map((communitys) => (
        <MainItem // community 값 보내주기
          key={communitys.uuid} // key값 필수
          uuid={communitys.uuid}
          title={communitys.title}
          content={communitys.content}
          date={communitys.date}
        />
      ))}
    </CommunityBlock>
  );
}

export default MainPresenter;
