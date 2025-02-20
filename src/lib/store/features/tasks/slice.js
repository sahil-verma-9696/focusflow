import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      "id": 1,
      "title": "Setup project repository",
      "assignee": ["Alice"],
      "status": "Done",
      "deadline": "2025-02-15",
      "description": "Initialize GitHub repository and set up folder structure.",
      "create At": "2025-02-10",
      "modify At": "2025-02-12"
    },
    {
      "id": 2,
      "title": "Design homepage UI",
      "assignee": ["Bob", "Charlie"],
      "status": "In progress",
      "deadline": "2025-02-25",
      "description": "Create a responsive UI design for the homepage using Figma.",
      "create At": "2025-02-18",
      "modify At": "2025-02-20"
    },
    {
      "id": 3,
      "title": "Develop authentication module",
      "assignee": ["David"],
      "status": "In review",
      "deadline": "2025-02-22",
      "description": "Implement login and signup with Firebase authentication.",
      "create At": "2025-02-15",
      "modify At": "2025-02-21"
    },
    {
      "id": 4,
      "title": "Setup database schema",
      "assignee": ["Eve"],
      "status": "Ready",
      "deadline": "2025-02-27",
      "description": "Design MongoDB schema for user and task management.",
      "create At": "2025-02-20",
      "modify At": "2025-02-20"
    },
    {
      "id": 5,
      "title": "Integrate real-time chat",
      "assignee": ["Frank", "Grace"],
      "status": "Backlog",
      "deadline": "2025-03-05",
      "description": "Use WebSockets for real-time messaging feature.",
      "create At": "2025-02-19",
      "modify At": "2025-02-19"
    },
    {
      "id": 6,
      "title": "Optimize API performance",
      "assignee": ["Hannah"],
      "status": "In progress",
      "deadline": "2025-02-28",
      "description": "Improve response time by implementing caching and indexing.",
      "create At": "2025-02-21",
      "modify At": "2025-02-22"
    },
    {
      "id": 7,
      "title": "Write unit tests",
      "assignee": ["Ian", "Jack"],
      "status": "Ready",
      "deadline": "2025-02-29",
      "description": "Create Jest unit tests for backend API endpoints.",
      "create At": "2025-02-20",
      "modify At": "2025-02-23"
    },
    {
      "id": 8,
      "title": "Deploy application",
      "assignee": ["Karen"],
      "status": "Backlog",
      "deadline": "2025-03-10",
      "description": "Deploy the application on Vercel for frontend and AWS for backend.",
      "create At": "2025-02-20",
      "modify At": "2025-02-20"
    },
    {
      "id": 9,
      "title": "Fix UI responsiveness issues",
      "assignee": ["Leo"],
      "status": "In review",
      "deadline": "2025-02-26",
      "description": "Ensure mobile responsiveness across different screen sizes.",
      "create At": "2025-02-18",
      "modify At": "2025-02-24"
    },
    {
      "id": 10,
      "title": "Add notifications feature",
      "assignee": ["Mia", "Noah"],
      "status": "In progress",
      "deadline": "2025-03-03",
      "description": "Implement push and in-app notifications for task updates.",
      "create At": "2025-02-17",
      "modify At": "2025-02-22"
    }
  ]
  ,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTasksFromSocket: (state, action) => {
      state.tasks = action.payload; // Sync tasks from the socket
    },
  },
});

export const { addTask, removeTask, updateTasksFromSocket } = taskSlice.actions;
export default taskSlice.reducer;
