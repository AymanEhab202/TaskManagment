import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const initialState = {
  tasks: [
    {
      id: "",
      title: "String",
      completed: false,
    },
  ],
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.data);
});

const tasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks.push({
        id: uuidv4(),
        title: action.payload,
        completed: false,
      });
    },
    remove: (state, action) => {
      const newtasks = state.tasks.filter((e, i) => i !== action.payload);
      state.tasks = newtasks;
      console.log(action.payload);
    },
    edit: (state, action) => {
      state.tasks[action.payload.id].title = action.payload.title;
    },
    toggleDone: (state, action) => {
      console.log(action.payload.completed);
      action.payload.completed === true
        ? (state.tasks[action.payload.id].completed = false)
        : (state.tasks[action.payload.id].completed = true);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, () => {
      console.log("Loading");
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log(
        "Done",
        action.payload.filter((e) => e.userId === 1)
      );
      state.tasks.push(...action.payload.filter((e) => e.userId === 1));
    });
    // builder.addCase(fetchTasks.rejected, () => {
    //     console.log("Loading")
    // });
  },
});

export default tasksSlice.reducer;
export const { add, remove, edit, toggleDone } = tasksSlice.actions;
