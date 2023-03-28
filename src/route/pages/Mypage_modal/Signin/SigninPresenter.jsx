import React from "react";
import "css/signin.css";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const SigninPresenter = ({
  email,
  passWord,
  onChange,
  onSubmit,
  newAccount,
  toggleAccount,
  onSocialClick,
}) => {
  return (
    <div className="login-page">
      <form onSubmit={onSubmit} className="login-form">
        {/* 이메일 로그인 */}
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          id="email"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={passWord}
          onChange={onChange}
          id="password"
          className="login-input"
        />
        <input
          className="login-submit"
          type="submit"
          value={newAccount ? "Join Us" : "Sign In"}
        />
      </form>
      <span className="mode_toggle" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Join Us"}
      </span>
      <div>
        {/* 소셜 로그인 */}
        <div className="social-button" onClick={onSocialClick} name="google">
          <div className="social-mark">
            <FcGoogle />
          </div>
          <div>Google</div>
          <div></div>
        </div>
        <div className="social-button" onClick={onSocialClick} name="github">
          <div className="social-mark">
            <BsGithub />
          </div>
          <div>Github</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SigninPresenter;
