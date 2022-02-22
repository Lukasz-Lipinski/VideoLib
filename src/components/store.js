import { configureStore } from "@reduxjs/toolkit";
import form from "./Form/redux";

export default configureStore({
  reducer: {
    form,
  },
});
