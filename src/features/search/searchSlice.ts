import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearchInput(state, action: PayloadAction<string>) {
      console.log(action.payload + "asd");
      return action.payload;
    },
  },
});

export const { updateSearchInput } = searchSlice.actions;

export default searchSlice.reducer;
