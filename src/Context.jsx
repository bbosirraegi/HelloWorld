import React, { useReducer, createContext, useContext, useRef } from 'react'

// 일단 박아넣은 예시들
// 기본 객체 만들어주기. 배열
const Communityinitial = [
    {id: 1, title: "강원도 여행가기", content: "오늘은 강원도 여행을 가볼거에요"},
    {id: 2, title: "전라도 여행가기", content: "오늘은 전라도 여행을 가볼거에요"},
    {id: 3, title: "부산시 여행가기", content: "오늘은 부산시 여행을 가볼거에요"},
];

// CREATE 생성
// 액션들에 대해서 상태 업데이트
function CommunityReducer(state, action) {
    switch (action.type) { // 만약 액션 타입이 ~ 이라면?
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
      throw new Error('Cannot find CommunityStateContext');
    }
    return context;
}

export function useCommunityDispatch() {
    const context = useContext(CommunityDispatchContext);
    if (!context) {
      throw new Error('Cannot find CommunityDispatchContext');
    }
    return context;
}

export function useCommunityNextId() {
    const context = useContext(CommunityNextIdContext);
    if (!context) {
      throw new Error('Cannot find CommunityNextIdContext');
    }
    return context;
}