import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  profileData: ProfileData;
  token: string;
}

interface ProfileData {
  email: string;
  familyName: string;
  givenName: string;
  name: string;
  id: string;
  picture: string;
}

const initialState = {
  authData: {
    profileData: {
      email: "",
      familyName: "",
      givenName: "",
      name: "",
      id: "",
      picture: "",
    } as ProfileData,
    token: "",
  },
};

// export const signin = createAsyncThunk(
//   "auth/signin",
//   async (formData: any, { getState, dispatch }) => {
//     try {
//       // log in the user...
//       //navigate('/')
//       const { data } = await dispatch(api.)
//     } catch (e) {
//       console.log(e);
//     }
//     console.log(formData);
//   }
// );

// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (formData: any, { getState, dispatch }) => {
//     try {
//       // signup the user...
//       //navigate('/')
//       console.log("aloha", getState());
//     } catch (e) {
//       console.log(e);
//     }
//     console.log("as", formData);
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action: PayloadAction<Payload>) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
    },
    logout(state, action: PayloadAction) {
      localStorage.clear();
      state.authData = initialState.authData;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(signin.fulfilled, (state, action) => {
  //     console.log("atsa", signin.fulfilled);
  //   });
  // },
});

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
