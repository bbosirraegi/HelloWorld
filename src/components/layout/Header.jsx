import React, {useState} from 'react'
import '../../css/mainlayout.css'
import { Link } from 'react-router-dom';
import {AiFillHome,AiOutlinePlusCircle} from 'react-icons/ai';
import {MdInsertComment,MdNotifications} from 'react-icons/md';
import CreateList from '../create/CreateList';
import CreateTemplate from '../create/CreateTemplate';
import CreateHead from '../create/CreateHead';

function Header() {

    const [create, setCreate] = useState(false); // 상태관리, 기본값 false
    const onCreate = () => setCreate(!create); // create 기존값 반전
    // 글쓰기 클릭하면 즐겨찾기 창 켜지게 (true)

    return (
    <div className='a-container'>
        <Link to="/" className='a-header'>HelloWorld</Link>
        <div className='a-navi'>
            {/* NAVI */}
            <Link to="/" className="a-navi-link">
                <AiFillHome/>
                홈
            </Link>
            <Link to="/topic" className="a-navi-link">
                <MdInsertComment/>
                토픽
            </Link>
            <Link to="/notification" className="a-navi-link">
                <MdNotifications/>
                알림
            </Link>
            <div onClick={onCreate} className='a-navi-create'>
                <AiOutlinePlusCircle/>
                글쓰기
            </div>
            {/* 모달창 만들기 (todolist 참고) */}
            {create && 
                <CreateTemplate setCreate={setCreate}>
                    {/* CreateTemplate 컴포넌트 내부에서 X클릭 시(closeCreate),
                    setCreate을 props로 전달한다.*/}
                    <CreateHead />
                    <CreateList />
                </CreateTemplate>
            }
        </div>
        <div className='a-mypage'>
            Mypage
            {/* 얘도 아마 모달인듯? */}
        </div>
    </div>
    )
}

export default Header