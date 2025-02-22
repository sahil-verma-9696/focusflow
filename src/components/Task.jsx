import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, editTask } from "@/lib/store/features/tasks/slice";
import TaskInput from "@/components/TaskInput";
import Menubar from "./Menubar";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handleEdit = (updatedTask) => {
    dispatch(editTask(updatedTask));
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      {isEditing && (
        <TaskInput
          isOpen={isEditing}
          setIsOpen={setIsEditing}
          editingTask={task}
          handleEditTask={handleEdit}
        />
      )}
      <h1 className="text-lg font-semibold">{task.title}</h1>
      <Menubar
        options={[
          { label: "Edit", action: () => setIsEditing(true) },
          { label: "Delete", action: handleDelete },
        ]}
      />
    </div>
  );
};

export default TaskItem;
