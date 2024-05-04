import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../Redux/jobSlice";  

const appStore = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export default appStore;
