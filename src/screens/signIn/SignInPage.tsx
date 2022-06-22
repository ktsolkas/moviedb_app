import { useEffect, useState } from "react";
import "./SignInPage.css";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../app/hooks";
// import { auth, signin, signup } from "../../features/auth/authSlice";
import { auth } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSignInMutation, useSignUpMutation } from "../../app/services/api";
// import { gapi } from "gapi-script";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInPage: React.FC = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const signIn = useSignInMutation();
  const signUp = useSignUpMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse?.access_token;
      // console.log("asd", tokenResponse);
      // console.log("ala", token);
      const res = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token
      );
      const profileData = await res.json();
      console.log(profileData);
      try {
        dispatch(auth({ profileData, token }));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log("Google log in was unsuccessful. ", error),
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);

    if (loginMode) {
      // dispatch(signin({ formData, navigate }));
      const [attempt] = signIn;
      try {
        const res = await attempt({ ...formData }).unwrap();
        console.log("RESULT", res);
        dispatch(auth({ profileData: res.result, token: res.token }));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      // dispatch(signup({ formData, navigate }));
      const [attempt] = signUp;
      try {
        const res = await attempt({ ...formData }).unwrap();
        // await attempt({ formData, navigate });
        console.log("RESULT", res);
        dispatch(auth({ profileData: res.result, token: res.token }));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setLoginMode((prev) => !prev);
    setShowPassword(false);
  };

  const switchPasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // const responseGoogle = (response: any) => {
  //   console.log(response);
  // };

  // const googleSuccess = (response: any) => {
  //   console.log(response);
  // };

  // const googleFailure = (error: any) => {
  //   console.log("Failure", error.details);
  // };

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId:
  //         "79054974389-d331kq17ikhppgu7777st4lsqnis1ksr.apps.googleusercontent.com",
  //       scope: "email",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // }, []);

  return (
    <main className="sign-in-form">
      <i className="fa-solid fa-key"></i>
      <h5>{!loginMode ? "Sign Up" : "Sign In"}</h5>
      <form onSubmit={handleSubmit}>
        {!loginMode && (
          <>
            <Input
              name="firstName"
              label="First Name"
              handleChange={handleChange}
              autoFocus={true}
            />
            <Input
              name="lastName"
              label="Last Name"
              handleChange={handleChange}
            />
          </>
        )}
        <Input
          name="email"
          label="Email"
          handleChange={handleChange}
          type="email"
          autoFocus={loginMode}
        />
        <Input
          name="password"
          label="Password"
          handleChange={handleChange}
          type={showPassword ? "text" : "password"}
          handleShowPassword={handleShowPassword}
        />
        {formData.password && (
          <i
            onClick={switchPasswordVisibility}
            className={`fa-solid ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } eye-icon`}
          ></i>
        )}
        {!loginMode && (
          <Input
            name="confirmPassword"
            label="Confirm Password"
            handleChange={handleChange}
            type="password"
          />
        )}
        <button type="submit">{!loginMode ? "Sign Up" : "Sign In"}</button>
        <button className="btn-google" type="button" onClick={() => login()}>
          Sign in with Google
        </button>
        {/* <GoogleLogin
          clientId="79054974389-d331kq17ikhppgu7777st4lsqnis1ksr.apps.googleusercontent.com"
          buttonText="Google Sign In"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
          // uxMode="redirect"
        /> */}
        <button className="btn-switch" type="button" onClick={switchMode}>
          {!loginMode
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </main>
  );
};

export default SignInPage;
