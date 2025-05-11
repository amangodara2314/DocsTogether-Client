import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import documentSlice from "../features/document/documentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    document: documentSlice,
  },
});

export default store;
