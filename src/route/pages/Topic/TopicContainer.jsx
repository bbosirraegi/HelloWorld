// 컨테이너는 프리젠터를 임포트한다. 컨테이너에서 프리젠터로 프롭스 보내기 때문

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TopicPresenter from "./TopicPresenter";

const TopicContainer = () => {
  /* Router */

  /* State */
  /* context로 전달해줄 것...! */
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
        "vietnam/v_food_6.jpg",
        "vietnam/v_food_7.jpg",
      ],
      comments: [],
      isMarked: true,
    },
    {
      id: 1,
      title: "들어는 봤나? 발트 3국",
      contents:
        "우리에겐 낯선 발트 3국!\n 에스토니아, 라트비아, 리투아니아. 들어보신 적 있으신가요? \n 세 나라는 '발트해'를 둘러싼 나라들로 묶어서 발트 3국이라 불리고 있어요. \n 우리나라엔 조금은 낯선 유럽이지만, 작고 아름다운 나라들이랍니다. \n 혹시 가보신 적이 있으신 분들을 댓글로 자랑해주세요~! ",
      images: [
        "balt/1.jpg",
        "balt/2.jpg",
        "balt/3.jpg",
        "balt/4.jpg",
        "balt/5.jpg",
        "balt/6.jpg",
        "balt/7.jpg",
        "balt/8.jpg",
        "balt/9.jpg",
        "balt/10.jpg",
        "balt/11.jpg",
        "balt/12.jpg",
        "balt/13.jpg",
        "balt/14.jpg",
        "balt/15.jpg",
        "balt/16.png",
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
      comments: [
        "얼마전에 갔었는데, 마리오월드는 인기가 너무 많아서 오픈런을 했는데도 못들어갔어요😥",
        "작년에 갔었는데, 또 가고 싶네요~~",
      ],
      isMarked: false,
    },
  ];

  /* Functions */

  /* Hooks */

  /* Render */
  return <TopicPresenter topics={initialTopic} />;
};

export default TopicContainer;
