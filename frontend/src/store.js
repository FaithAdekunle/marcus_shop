import axios from "axios";
import { parse } from "cookie";
import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

const handleRequest = request => {
  const headers = { "token-type": "Bearer" };
  const data = parse(document.cookie);

  if (data.uid) headers.uid = data.uid;
  if (data.expiry) headers.expiry = data.expiry;
  if (data.client) headers.client = data.client;
  if (data["access-token"]) headers["access-token"] = data["access-token"];
  request.headers = { ...headers, ...request.headers };
  return request;
};

const initializeStore = axiosInstance => {
  const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: axiosInstance ? { api: axiosInstance } : undefined
        },
        immutableCheck: false,
        serializableCheck: false
      })
  });

  return store;
};

const createStore = () => {
  const axiosClientConfig = {
    withCredentials: true,
    baseURL: "http://localhost:7002", // CHANGE THIS FOR PRODUCTION
    headers: { "X-Requested-With": "XMLHttpRequest" }
  };

  const axiosInstance = axios.create(axiosClientConfig);

  axiosInstance.interceptors.request.use(request => handleRequest(request));

  return initializeStore(axiosInstance);
};

export default createStore;
