import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    page: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload.text;
      state.page = action.payload.page;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
