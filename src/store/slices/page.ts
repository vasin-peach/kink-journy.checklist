import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
const initialState = {
  page: 0,
  name: "",
};

export const pageSlice = createSlice({
  name: "page",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incressePage: (state) => {
      if (state.page === 2) return;
      state.page = state.page + 1;
    },
    decreasePage: (state) => {
      if (state.page === 0) return;
      state.page = state.page - 1;
    },
    setStep: (state, payload) => {
      state.page = payload.payload;
    },
    setName: (state, payload) => {
      state.name = payload.payload;
    },
  },
});

export const { incressePage, decreasePage, setStep, setName } =
  pageSlice.actions;
export const getName = (state: RootState) => state.page.name;

const pageReducer = pageSlice.reducer;
export default pageReducer;
