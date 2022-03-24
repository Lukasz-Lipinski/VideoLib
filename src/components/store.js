import { configureStore } from "@reduxjs/toolkit";
import user from "./Form/redux";

export default configureStore({
  reducer: {
    user,
  },
});
