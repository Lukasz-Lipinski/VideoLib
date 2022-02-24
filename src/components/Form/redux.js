import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  users: [],
  usersEmails: [],
  user: {
    isLogged: false,
    email: "",
    password: "",
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
  },
});

export const { increamentStep, setUserStatus, setUsers } = formSlicer.actions;

export default formSlicer.reducer;
