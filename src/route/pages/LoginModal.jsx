import React, { useState } from "react";
import ModalTemplate from "components/Modal/ModalTemplate";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoginTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-size: 25px;
  }
`;

const ModalCloseBtn = styled.div`
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 25px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;

const LoginForm = styled.form`
  width: 230px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const LoginInput = styled.input`
  height: 40px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #2e86de;
  margin-bottom: 10px;
  padding-left: 10px;
  color: #2e86de;

  &::placeholder {
    color: #2e86de;
  }
`;

const LoginBtn = styled.input`
  height: 40px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #2e86de;
  background-color: #2e86de;
  color: white;

  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const DividerArea = styled.div`
  width: 240px;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-size: 15px;
  margin: 8px 0px;

  &::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background-color: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }

  &::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background-color: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

const SocailLoginArea = styled.div`
  display: flex;
  width: 230px;
  flex-direction: column;
`;

const SocialBtn = styled.button`
  height: 40px;
  width: 230px;
  border-radius: 10px;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0px 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.backColor};
  border: 2px solid ${(props) => props.border};
  color: ${(props) => props.color};

  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
`;

const SocialMark = styled.div`
  font-size: 20px;
  display: flex;
`;

const LoginModal = ({ closeModal }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* variable */
  const auth = getAuth();
  const navigate = useNavigate();
  let data = "";
  /* function */
  const ToggleAccount = () => setNewAccount((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
    closeModal();
    goHome();
  };

  const onGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    closeModal();
    goHome();
  };

  const onGithubClick = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
    closeModal();
    goHome();
  };
  /* rendering */
  return (
    <ModalTemplate mode="login">
      <ModalCloseBtn onClick={closeModal}>
        <GrFormClose />
      </ModalCloseBtn>
      <LoginTemplateBlock>
        <Title>로그인</Title>
        {/* 소셜 로그인 */}
        <SocailLoginArea>
          <SocialBtn
            backColor="white"
            color="black"
            border="lightgray"
            onClick={onGoogleClick}
            name="google"
          >
            <SocialMark>
              <FcGoogle />
            </SocialMark>
            <div>Google</div>
            <div></div>
          </SocialBtn>
          <SocialBtn
            backColor="#24292f"
            color="white"
            border="#24292f"
            onClick={onGithubClick}
            name="github"
          >
            <SocialMark id="github">
              <BsGithub />
            </SocialMark>
            <div>Github</div>
            <div></div>
          </SocialBtn>
        </SocailLoginArea>
        {/* 구분선 */}
        <DividerArea>or</DividerArea>
        {/* 로그인 폼 */}
        <LoginForm onSubmit={onSubmit}>
          <LoginInput
            placeholder="이메일"
            type="text"
            name="email"
            value={email}
            onChange={onChange}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={onChange}
          />
          <LoginBtn type="submit" value={newAccount ? "회원가입" : "로그인"} />
        </LoginForm>
        <span style={{ marginTop: "10px", fontSize: "12px" }}>
          {newAccount ? "회원이신가요?" : "회원이 아니신가요?"}&nbsp;&nbsp;
          <span style={{ color: "#2e86de" }} onClick={ToggleAccount}>
            <u>{newAccount ? "로그인" : "회원가입"}</u>
          </span>
        </span>
      </LoginTemplateBlock>
    </ModalTemplate>
  );
};

export default LoginModal;
