import { dbService } from "fBase";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, {
  useReducer,
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

// 일단 박아넣은 예시들
// 기본 객체 만들어주기. 배열
/* FOR COMMUNITY */
const initialCommunity = [
  {
    id: 1,
    title: "강원도 여행가기",
    content:
      "오늘은 강원도 여행을 가볼거에요\n근데 이거 아래로 내리기 하려면\n그니까 엔터 치려면 어떻게 해야하는 거에요?\n이렇게 글이 길어지면 어찌되는 거에요????????",
  },
  {
    id: 2,
    title: "전라도 여행가기",
    content: "오늘은 전라도 여행을 가볼거에요",
  },
  {
    id: 3,
    title: "부산시 여행가기",
    content: "오늘은 부산시 여행을 가볼거에요",
  },
  {
    id: 4,
    title: "서울시 여행가기",
    content: "오늘은 부산시 여행을 가볼거에요",
  },
  {
    id: 5,
    title: "경기도 여행가기",
    content: "오늘은 부산시 여행을 가볼거에요",
  },
];

/* Community REDUCER */
// CREATE 생성
// 액션들에 대해서 상태 업데이트
function CommunityReducer(state, action) {
  switch (
    action.type // 만약 액션 타입이 ~ 이라면?
  ) {
    case "CREATE":
      // state 배열을  action.community 배열에 붙여주기(concat)
      // 새로 생성되는 게시물(action.community)이 상단에 배치됨
      return action.community.concat(state);
    //액션 항목 안에 community 넣어서 dispatch 해줄 것

    default: // 처리할 수 없는 액션 온다면 throw
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

/* Community CONTEXT */
const CommunityStateContext = createContext(); // state 위한 context
const CommunityDispatchContext = createContext(); // dispatch 위한 context
const CommunityNextIdContext = createContext(); // nextid 위한 context

// 컴포넌트
// Provider 다 합쳐서 AnyProvider 로 이름 바꿔보았어용
export function AnyProvider({ children }) {
  // CommunityReducer, 초기상태(initialCommunity)
  const [communitystate, communitydispatch] = useReducer(
    CommunityReducer,
    initialCommunity
  );

  const nextId = useRef(6);
  // 현재 5개 들어있으니 그 다음인 6로 초기화

  return (
    // State와 Dispath 중 뭐를 바깥으로 해줘도 상관없다.
    // value 값 설정해줘야한다.

    <CommunityStateContext.Provider value={communitystate}>
      <CommunityDispatchContext.Provider value={communitydispatch}>
        <CommunityNextIdContext.Provider value={nextId}>
          {children}
        </CommunityNextIdContext.Provider>
      </CommunityDispatchContext.Provider>
    </CommunityStateContext.Provider>
  );
}

/* Community CUSTOM HOOK */
// 3개의 커스텀 훅
// 이렇게 해놓으면 나중에 그냥 useCommunityState 만 불러와서 쓰면 된다.
export function useCommunityState() {
  // 에러처리

  const context = useContext(CommunityStateContext);
  if (!context) {
    throw new Error("Cannot find AnyProvider");
  }
  return context;
}

export function useCommunityDispatch() {
  const context = useContext(CommunityDispatchContext);
  if (!context) {
    throw new Error("Cannot find AnyProvider");
  }
  return context;
}

export function useCommunityNextId() {
  const context = useContext(CommunityNextIdContext);
  if (!context) {
    throw new Error("Cannot find AnyProvider");
  }
  return context;
}
