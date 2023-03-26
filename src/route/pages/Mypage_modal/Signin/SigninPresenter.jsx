import React from "react";

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
    <div>
      <form onSubmit={onSubmit}>
        {/* 이메일 로그인 */}
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
          id="email"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={passWord}
          onChange={onChange}
          id="password"
        />
        <input type="submit" value={newAccount ? "Join Us" : "Sign In"} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Join Us"}</span>
      <div>
        {/* 소셜 로그인 */}
        <button onClick={onSocialClick} name="google">
          Google
        </button>
        <button onClick={onSocialClick} name="github">
          Github
        </button>
      </div>
    </div>
  );
};

export default SigninPresenter;
