import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  users: [],
  usersEmails: [],
  user: {
    isLogged: false,
    email: "",
    liked: [],
    phoneNumber: "",
  },
};

const formSlicer = createSlice({
  name: "formSlicer",
  initialState,
  reducers: {
    increamentStep: (state, action) => {
      ++state.step;
    },
    setUserStatus: (state, action) => {
      const { passowrd, email, isLogged } = action.payload;
      state.user = {
        isLogged,
        email,
        passowrd,
      };
    },
    setUsers: (state, action) => {
      state.users = action.payload.map((user) => user.fields);
      state.usersEmails = action.payload.map((user) => user.fields.email);
    },
    resetStep: (state, action) => {
      state.step = 1;
    },
  },
});

export const { increamentStep, setUserStatus, setUsers, resetStep } =
  formSlicer.actions;

export default formSlicer.reducer;
