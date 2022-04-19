import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  users: [],
  usersEmails: [],
  profile: {
    pofileName: "",
    bgColor: "",
    kidSecurity: "",
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
    setProfile: (state, action) => {
      const { bgColor, profileName, kidSecurity } = action.payload;

      state.profile = {
        bgColor,
        profileName,
        kidSecurity,
      };
    },
  },
});

export const {
  increamentStep,
  setUserStatus,
  setUsers,
  resetStep,
  setProfile,
} = formSlicer.actions;

export default formSlicer.reducer;
