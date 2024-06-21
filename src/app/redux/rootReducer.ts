import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../../components/auth/model/auth.slice.ts";

export const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
});