import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IData } from "../../components/Step1";
const initialState: { [key: string]: IData[] } = {
  lifeStyle: [],
  playScene: [],
};

export const summarySlice = createSlice({
  name: "summary",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateLifeStyle: (state, action: PayloadAction<any>) => {
      state.lifeStyle = action.payload;
    },
    updatePlayScene: (state, action: PayloadAction<any>) => {
      state.playScene = action.payload;
    },
  },
});

export const { updateLifeStyle, updatePlayScene } = summarySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getRole = (state: RootState) => {
  const dom = state.summary.lifeStyle.filter(
    (i) => i.type === "dom" && i.value?.interest
  ).length;
  const sub = state.summary.lifeStyle.filter(
    (i) => i.type === "sub" && i.value?.interest
  ).length;
  const both = state.summary.lifeStyle.filter(
    (i) => i.type === "switch" && i.value?.interest
  ).length;
  const result = dom === sub ? "Switch" : dom > sub ? "DOM" : "sub";
  return result;
};

export const getLifeStyle = (state: RootState) => state.summary.lifeStyle;
export const getPlayScene = (state: RootState) => state.summary.playScene;
export const getLikeScene = (state: RootState) =>
  state.summary.playScene.filter((i) => i.value?.like);
export const getWantToTryScene = (state: RootState) =>
  state.summary.playScene.filter((i) => i.value?.wantToTry);
export const getUnlikeScene = (state: RootState) =>
  state.summary.playScene.filter((i) => i.value?.unlike);

const summaryReducer = summarySlice.reducer;
export default summaryReducer;
