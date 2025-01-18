import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userReducer";

const appReducer = combineReducers({ user: userReducer });

export default appReducer;
