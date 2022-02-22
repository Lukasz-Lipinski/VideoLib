import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
};

const formSlicer = createSlice({
  name: "formSlicer",
  initialState,
  reducers: {
    increamentStep: (state, action) => {
      ++state.step;
    },
  },
});

export const { increamentStep } = formSlicer.actions;

export default formSlicer.reducer;
