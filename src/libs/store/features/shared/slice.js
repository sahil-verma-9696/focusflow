import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    tasks: [
      {
        id: "1",
        title: "Fix Login Issue",
        assignee: ["Alice", "Bob"],
        status: "In Progress",
        label: "in progress",
        deadline: "2025-02-20T12:00:00.000+00:00",
        description: "Resolve the bug causing login failures",
        createdAt: "2025-02-19T06:11:07.416+00:00",
        modifiedAt: "2025-02-19T06:21:09.833+00:00",
      },
      {
        id: "2",
        title: "Refactor API Endpoints",
        assignee: ["Charlie"],
        status: "Backlog",
        label: "backlog",
        deadline: "2025-03-01T14:00:00.000+00:00",
        description: "Optimize and clean up backend API endpoints",
        createdAt: "2025-02-18T10:30:00.000+00:00",
        modifiedAt: "2025-02-18T10:45:00.000+00:00",
      },
      {
        id: "3",
        title: "Review PR #42",
        assignee: ["Eve"],
        status: "In Review",
        label: "in review",
        deadline: "2025-02-22T18:00:00.000+00:00",
        description: "Review the new feature pull request and provide feedback",
        createdAt: "2025-02-21T09:15:00.000+00:00",
        modifiedAt: "2025-02-21T09:30:00.000+00:00",
      },
      {
        id: "4",
        title: "Optimize Frontend Performance",
        assignee: ["Grace", "Mallory"],
        status: "Ready",
        label: "ready",
        deadline: "2025-02-25T10:00:00.000+00:00",
        description: "Improve load times and optimize asset delivery",
        createdAt: "2025-02-20T14:50:00.000+00:00",
        modifiedAt: "2025-02-20T15:10:00.000+00:00",
      },
      {
        id: "5",
        title: "Setup CI/CD Pipeline",
        assignee: ["Trent"],
        status: "Backlog",
        label: "backlog",
        deadline: "2025-03-05T15:00:00.000+00:00",
        description: "Automate deployment process for faster releases",
        createdAt: "2025-02-17T08:30:00.000+00:00",
        modifiedAt: "2025-02-17T08:45:00.000+00:00",
      },
      {
        id: "6",
        title: "Finalize Documentation",
        assignee: ["Peggy"],
        status: "In Review",
        label: "in review",
        deadline: "2025-02-28T16:00:00.000+00:00",
        description: "Complete and proofread technical documentation",
        createdAt: "2025-02-24T11:00:00.000+00:00",
        modifiedAt: "2025-02-24T11:30:00.000+00:00",
      },
    ],
    labels: [
      { id: 1, name: "all" },
      { id: 2, name: "backlog" },
      { id: 3, name: "in progress" },
      { id: 4, name: "in review" },
      { id: 5, name: "ready" },
    ],
  },
  reducers: {
    // TASK OPERATIONS
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // LABEL OPERATIONS
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    addLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    deleteLabel: (state, action) => {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setLabels,
  addLabel,
  deleteLabel,
} = sharedSlice.actions;
export default sharedSlice.reducer;
