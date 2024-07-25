import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

const store = configureStore({
  reducer: {
    task: tasksReducer,
  },
});

export default store;
