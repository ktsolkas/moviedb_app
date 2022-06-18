import { useLayoutEffect, useRef, useState } from "react";
import "./SignInPage.css";

const SignInPage: React.FC = () => {
  const [loginMode, setLoginMode] = useState(true);
  const inputReference = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
  });
  return (
    <div className="sign-in-form">
      <form>
        <label htmlFor="email">Email </label>
        <input ref={inputReference} type="email" name="email" required />
        <label htmlFor="password">Password </label>
        <input type="password" name="password" required />
      </form>
      <button type="submit">{loginMode ? "Login" : "Sign Up"}</button>
      <button type="button" onClick={() => setLoginMode(!loginMode)}>
        Switch to {loginMode ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default SignInPage;
