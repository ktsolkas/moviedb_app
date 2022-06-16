import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearchInput(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { updateSearchInput } = searchSlice.actions;

export default searchSlice.reducer;
