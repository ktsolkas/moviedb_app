import "./SignInPage.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import Input from "../components/Input/Input";
import { useAppDispatch } from "../../app/hooks";
import { auth } from "../../app/store/authSlice";
import {
  serverApi,
  useSignInMutation,
  useSignUpMutation,
} from "../../app/store/services/api";
import { ProfileData } from "../../common/types/ProfileData";

interface LocationState {
  from?: string;
}

interface AuthResponse {
  result: Partial<ProfileData>;
  token: string;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [loginMode, setLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const token = tokenResponse?.access_token;
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token
        );
        const profileData = await res.json();
        const tokeninfoRes = await fetch(
          "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
        );

        const expires_in = await tokeninfoRes
          .json()
          .then((value) => value.expires_in);
        var tokenExpirationDate: Date = new Date();
        tokenExpirationDate.setSeconds(
          new Date().getSeconds() + parseInt(expires_in)
        );

        tryAfterLogin(profileData, token, tokenExpirationDate.toJSON());
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log("Google log in was unsuccessful. ", error),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginMode) {
      try {
        const res: AuthResponse = await signIn({ ...formData }).unwrap();
        const profileData = res.result;
        const token = res.token;

        const decodedToken: any = jwt_decode(token);
        const tokenExpirationDate = new Date(decodedToken.exp * 1000).toJSON();

        tryAfterLogin(profileData, token, tokenExpirationDate);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res: AuthResponse = await signUp({ ...formData }).unwrap();
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

  const tryAfterLogin = (
    profileData: Partial<ProfileData>,
    token: string,
    tokenExpirationDate: string
  ) => {
    dispatch(auth({ profileData, token, tokenExpirationDate }));
    dispatch(
      serverApi.endpoints.getWatchlist.initiate(null, {
        subscribe: false,
        forceRefetch: true,
      })
    );
    if (locationState && locationState.from) {
      navigate(locationState.from);
    } else {
      navigate("/");
    }
  };

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
