import React, { useState } from "react";
import styled from "styled-components";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { dbService } from "fBase";
import { doc, updateDoc } from "firebase/firestore";
const BookmarkButton = styled.div``;
const BookmarkBtn = ({ tid, uid, bookmarks, on }) => {
  // tid : 북마크를 표시할 대상의 id (ex. topic id)
  // uid : 북마크 사용자 id
  // State
  const [isMarked, setIsMarked] = useState(bookmarks.length);

  /* Vairable */
  // target 북마크를 추가할 대상
  // tid로 filter 작업해서 추가할 대상 뽑아내기(?)
  let target;
  if (on === "topic") {
    target = doc(dbService, "topics", tid);
  }
  // 새로운 북마크 배열
  const newBookmarks = bookmarks.concat([uid]);
  /* Function */
  const onClick = async (e) => {
    e.stopPropagation();
    if (on === "topic") {
      await updateDoc(target, { isMarked: newBookmarks });
    }
    setIsMarked(!isMarked);
  };
  return (
    <BookmarkButton onClick={onClick}>
      {isMarked ? <BsFillBookmarkFill /> : <BsBookmark />}
    </BookmarkButton>
  );
};

export default BookmarkBtn;
