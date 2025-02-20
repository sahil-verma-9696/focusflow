import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../lib/store/features/tasks/slice";
import { useSocket } from "../lib/hooks/socket/hooks";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    dispatch({ type: "tasks/updateTasksFromSocket", payload: reorderedTasks });

    // Emit task reorder event
    if (socket) {
      socket.emit("taskReorder", reorderedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-item"
                  >
                    {task.title}
                    <button onClick={() => dispatch(removeTask(task.id))}>
                      ❌
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoard;
