import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tasks {
  id: string | undefined;
  taskName: string;
  description: string;
  status: boolean;
}

interface TasksItem {
  taskItems: Tasks[];
}

const initialState: TasksItem = {
  taskItems: [],
};

export const taskTrackerSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action: PayloadAction<Tasks>) => {
      state.taskItems.push(action.payload);
    },
    deleteTasks: (state, action: PayloadAction<string>) => {
      state.taskItems = state.taskItems.filter(
        (item: Tasks) => item.id !== action.payload
      );
    },
    updateTasks: (state, action: PayloadAction<Tasks>) => {
      const item = state.taskItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.id = action.payload.id;
        item.taskName = action.payload.taskName;
        item.description = action.payload.description;
        item.status = action.payload.status;
      }
    },
    markAsDoneTasks: (state, action: PayloadAction<string>) => {
      const item = state.taskItems.find((item) => item.id === action.payload);
      if (item) {
        item.status === true ? (item.status = false) : (item.status = true);
      }
    },
  },
});

export const { addTasks, deleteTasks, updateTasks, markAsDoneTasks } = taskTrackerSlice.actions;
export default taskTrackerSlice.reducer;
