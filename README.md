# 🚀 Project Name: **FocusFlow**


![image](https://github.com/user-attachments/assets/333f6196-44e7-45cf-a385-a39156ede8e4)





## 🌟 Overview

Welcome to **🚀 FocusFlow**!  

This project was built as part of the **🏆 FOSS Hackathon 2025** to tackle some of the biggest challenges hackathon teams face. Many participants struggle with **🤝 team formation, ⏳ real-time collaboration, and 📊 streamlined project presentation**—often leading to inefficiencies and missed opportunities.  

🔹 **What does FocusFlow do?**  
✨ **Intelligent Team Matching** – Find the perfect teammates based on skill compatibility.  
📌 **Real-Time Collaboration Dashboard** – Manage tasks 📝, set deadlines ⏰, and chat 💬 in one place.  
🖼️ **AI-Powered Presentation Builder** – Auto-generate professional slides 🎤 with just a few inputs.  

**🔧 Built With:**  
⚡ **Frontend:** Next.js, React, Redux 
🎨 **Styling:**  CSS , Tailwind CSS, Sass,Typescript   
🛠️ **Backend:** Node.js 
📂 **Database:** MongoDB 

With **FocusFlow**, teams can stay **organized, productive, and presentation-ready** without the usual last-minute chaos. Whether you're a **developer 👨‍💻, designer 🎨, or strategist 📊**, this tool is designed to **maximize efficiency and innovation**. 🚀🔥  

🔹 **Team Name:** [Focus-Flow]  
🔹 **Team Members:** [Sahil Verma], [Sonal Verma], [Muskan Gautam], [Vansh Nigam]  
🔹 **Hackathon:** FOSS Hackathon 2025  

---

## 🛠️ Features
✅ **Team Matching & Project Setup**  
   - Users create profiles with skills (Frontend, Backend, Design).
   - Match teammates based on skill gaps.
   - Pre-built project templates.

✅ **Real-Time Collaboration Dashboard**  
   - Task board with drag-and-drop cards.
   - Integrated timer for hackathon deadlines.
   - Live chat for team communication.

✅ **Auto-Generated Presentation Builder**  
   - Users input key project details (problem, solution, tech stack).
   - AI-powered slide generator (simple template engine).
   - Export to PDF/PPT or share via a live link.

---

## 📸 Screenshots

![Screenshot 1](./assets/screenshot1.png)
*Dashboard Overview*

![Screenshot 2](./assets/screenshot2.png)
*Team Matching Feature*

---

## 🔧 Tech Stack

- **Frontend: Next.js, React, Redux ,CSS , Tailwind CSS, Sass,Typescript.**
- **Backend:  CSS,Tailwind CSS, Sass,Typescript.**
- **Database: MongoDB.**
- **Realtime: Socket.io for chat/task updates.**
- **Optional: Markdown-to-PPT library for presentations.**

---

## 🚀 Installation & Usage

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- Any other dependencies

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/focusflow.git

# Navigate into the project directory
cd focusflow

# Install dependencies
npm install 
```

### Running the Project
```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm run start
```

---

## 🎯 Future Improvements
- [ ] GitHub Sync: Automatically create a repo with a README template.
- [ ] Devpost Integration: Auto-fill submission forms with project data.
- [ ] Offline Mode: Use local storage to let teams work without internet.

---

## 🤝 Contributing
We welcome contributions! Feel free to open issues or submit pull requests.

---

## 📄 License
This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 📝 Acknowledgments
Special thanks to:
- **[FOSS UNITED KANPUR]** for guidance
- **FOSS Hackathon 2025** for the platform
- **Community** for support

---

📩 **Contact.**  

👩‍💻 **Muskan Gautam**  
📧 Email: [muskangautam7064@gmail.com](mailto:muskangautam7064@gmail.com)  
🔗 LinkedIn: [Muskan Gautam](https://www.linkedin.com/in/muskan-gautam-mg893)  
🐙 GitHub: [Muskangautam8933](https://github.com/Muskangautam8933)  

👩‍💻 **Sonal Verma**  
📧 Email: [sonalv308@gmail.com](mailto:sonalv308@gmail.com)  
🔗 LinkedIn: [Sonal Verma](https://www.linkedin.com/in/sonal-verma-7b45672aa/)  
🐙 GitHub: [sonal-verma-4397](https://github.com/sonal-verma-4397)  

👨‍💻 **Sahil Verma**  
📧 Email: [sahils.verma.1000@gmail.com](mailto:sahils.verma.1000@gmail.com)  
🔗 LinkedIn: [Sahil Verma](https://www.linkedin.com/in/sahil-verma-04944b240/)  
🐙 GitHub: [sahil-verma-9696](https://github.com/sahil-verma-9696)  

👨‍💻 **Vansh Nigam**  
📧 Email: [vanshnigam8081432513@gmail.com](mailto:vanshnigam8081432513@gmail.com)  
🔗 LinkedIn: [Vansh Nigam](https://www.linkedin.com/in/vansh-nigam-926302250/)  
🐙 GitHub: [VanshNigam](https://github.com/VanshNigam)  

      

             
<<<<<<< HEAD
   
=======
   
>>>>>>> finalbr



"use client";
import { useState } from "react";
import { useSharedState } from "@/libs/hooks/useSharedState";
import { PlusCircle, Table, BarChart2 } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import TableView from "./TableView";
import TimelineView from "./TimelineView";

export default function TasksComponent() {
  const {
    items: tasks,
    newItem,
    setNewItem,
    addItem,
  } = useSharedState("tasks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("grid");

  const handleAddTask = () => {
    if (!newItem.title.trim() || !newItem.description.trim()) return;
    addItem();
    setNewItem({
      title: "",
      description: "",
      status: "To Do",
      attendees: [],
      dueDate: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">📋 Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-2 rounded-lg ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-3 py-2 rounded-lg ${
              view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <Table size={18} />
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`px-3 py-2 rounded-lg ${
              view === "timeline" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            <BarChart2 size={18} />
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} /> Add Task
        </button>
      </div>

      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
      {view === "table" && <TableView tasks={tasks} />}
      {view === "timeline" && <TimelineView tasks={tasks} />}

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddTask={handleAddTask}
        />
      )}
    </div>
  );
}
