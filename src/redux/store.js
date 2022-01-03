import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "./services/contact";

const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

export default store;
