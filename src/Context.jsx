import React, { useReducer, createContext, useContext, useRef } from "react";

// 일단 박아넣은 예시들
// 기본 객체 만들어주기. 배열
/* FOR COMMUNITY */
const Communityinitial = [
  {
    id: 1,
    title: "강원도 여행가기",
    content: "오늘은 강원도 여행을 가볼거에요",
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
];

// CREATE 생성
// 액션들에 대해서 상태 업데이트
function CommunityReducer(state, action) {
  switch (
    action.type // 만약 액션 타입이 ~ 이라면?
  ) {
    case "CREATE":
      return state.concat(action.community);
    //액션 항목 안에 community 넣어서 dispatch 해줄 것
    //state 배열에 action.community 추가하여 리턴

    default: // 처리할 수 없는 액션 온다면 throw
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

//Context
const CommunityStateContext = createContext(); // state 위한 context
const CommunityDispatchContext = createContext(); // dispatch 위한 context
const CommunityNextIdContext = createContext(); // nextid 위한 context

// 컴포넌트
export function CommunityProvider({ children }) {
  const [state, dispatch] = useReducer(CommunityReducer, Communityinitial);
  // CommunityReducer, 초기상태(Communityinitial)

  const nextId = useRef(4);
  // 현재 4개 들어있으니 그 다음인 5로 초기화

  return (
    // State와 Dispath 중 뭐를 바깥으로 해줘도 상관없다.
    // value 값 설정해줘야한다.
    <CommunityStateContext.Provider value={state}>
      <CommunityDispatchContext.Provider value={dispatch}>
        <CommunityNextIdContext.Provider value={nextId}>
          {children}
        </CommunityNextIdContext.Provider>
      </CommunityDispatchContext.Provider>
    </CommunityStateContext.Provider>
  );
}

// 3개의 커스텀 훅
// 이렇게 해놓으면 나중에 그냥 useCommunityState 만 불러와서 쓰면 된다.
export function useCommunityState() {
  // 에러처리

  const context = useContext(CommunityStateContext);
  if (!context) {
    throw new Error("Cannot find CommunityStateContext");
  }
  return context;
}

export function useCommunityDispatch() {
  const context = useContext(CommunityDispatchContext);
  if (!context) {
    throw new Error("Cannot find CommunityDispatchContext");
  }
  return context;
}

export function useCommunityNextId() {
  const context = useContext(CommunityNextIdContext);
  if (!context) {
    throw new Error("Cannot find CommunityNextIdContext");
  }
  return context;
}

/* FOR TOPIC */
/* TOPIC INITIAL STATE */
/* 북마크 속성 추가해주기 */
const initialTopic = [
  {
    id: 0,
    title: "베트남에 먹으러 가는 사람들 모여",
    contents: "베트남에 먹으러 가는 사람?\n 나다 싶으면 일단 댓글달자",
    images: [
      "vietnam/v_food_1.jpg",
      "vietnam/v_food_2.jpg",
      "vietnam/v_food_3.jpg",
      "vietnam/v_food_4.jpg",
      "vietnam/v_food_5.jpg",
    ],
    /* comment에 comment속성 추가해주기 */
    comments: [
      {
        commentId: 0,
        userInfo: {
          nickname: "두근두근한 치즈피자",
          profile: "/image/temp.jpg",
        },
        comment: "다시 가고 싶다ㅠㅠ",
        isRoot: true,
        reply: [
          {
            commentId: 1,
            userInfo: {
              nickname: "이불 속에 파묻힌 햄스터",
              profile: "/image/hamster.jpg",
            },
            comment: "저두요ㅠㅠ",
            isRoot: false,
            imgUrl: "/image/vietnam/v_food_7.jpg",
            heart: 0,
          },
        ],
        imgUrl: "/image/vietnam/v_food_6.jpg",
        heart: 3,
      },
    ],
    isMarked: true,
  },
  {
    id: 1,
    title: "들어는 봤나? 발트 3국",
    contents:
      "우리에겐 낯선 발트 3국!\n 에스토니아, 라트비아, 리투아니아.\n 들어보신 적 있으신가요? \n 세 나라는 '발트해'를 둘러싼 나라들로 묶어서 발트 3국이라 불리고 있어요. \n 우리나라엔 조금은 낯선 유럽이지만, 작고 아름다운 나라들이랍니다. \n 혹시 가보신 적이 있으신 분들을 댓글로 자랑해주세요~! ",
    images: [
      "balt/1.jpg",
      "balt/2.jpg",
      "balt/3.jpg",
      "balt/4.jpg",
      "balt/5.jpg",
    ],
    comments: [],
    isMarked: false,
  },
  {
    id: 2,
    title: "일본 오사카 속 환상의 나라, 유니버셜",
    contents:
      "오사카하면 빠질 수 없는 곳이 있죠?! \n바로바로~~\n 🌈유니버셜 스튜디오🌈! \n최근 마리오 월드로 또다시 선풍적인 인기를 끌고 있는 곳이죠.\n함께 이야기해 볼 까요?💃🏻🕺🏻 ",
    images: [
      "osaka/1.jpg",
      "osaka/2.jpg",
      "osaka/3.jpg",
      "osaka/4.jpg",
      "osaka/5.jpg",
    ],
    comments: [],
    isMarked: false,
  },
];

/* TOPIC REDUCER */
function topicReducer(state, action) {
  switch (action.type) {
  }
}

/* TOPIC CONTEXT */
const TopicStateContext = createContext();
const TopicDispatchContext = createContext();

/* TOPIC PROVIDER */
export function TopicProvider({ children }) {
  const [state, dispatch] = useReducer(topicReducer, initialTopic);
  return (
    <TopicStateContext.Provider value={state}>
      <TopicDispatchContext.Provider value={dispatch}>
        {children}
      </TopicDispatchContext.Provider>
    </TopicStateContext.Provider>
  );
}

function errorHandler(context) {
  if (!context) {
    throw new Error("CANNOT FIND TopicProvider");
  }
  return context;
}

/* TOPIC CUSTOM HOOK */
export function useTopicState() {
  return errorHandler(useContext(TopicStateContext));
}

export function useTopicDispatch() {
  return errorHandler(useContext(TopicDispatchContext));
}
