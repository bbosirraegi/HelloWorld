import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninPresenter from "./SigninPresenter";

const SigninContainer = () => {
  /* Router */
  /* State */
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  /* Variable */
  const auth = getAuth();
  const navigate = useNavigate();
  let data = "";
  /* Functions */
  const goToHome = () => {
    navigate("/");
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassWord(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이메일 가입 & 로그인 처리
      if (newAccount) {
        //create a account
        data = await createUserWithEmailAndPassword(auth, email, passWord);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, passWord);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassWord("");
    goToHome();
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (e) => {
    let provider = "";
    let result = "";
    const {
      target: { name },
    } = e;

    //SignIn using a pop up (redirect로 변경할 수도 있음...!)
    if (name == "google") {
      provider = new GoogleAuthProvider();
    } else if (name == "github") {
      provider = new GithubAuthProvider();
    }
    result = await signInWithPopup(auth, provider);
    // The Signed-in user info
    const user = result.user;
    console.log(result);
    goToHome();
  };
  /* Hooks */

  /* Render */
  return (
    <SigninPresenter
      email={email}
      passWord={passWord}
      onChange={onChange}
      onSubmit={onSubmit}
      newAccount={newAccount}
      toggleAccount={toggleAccount}
      onSocialClick={onSocialClick}
    />
  );
};

export default SigninContainer;
