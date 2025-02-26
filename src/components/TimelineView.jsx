export default function TimelineView({ tasks }) {
  if (!tasks) return;
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
  return (
    <div className="timeline">
      {sortedTasks?.map((task) => (
        <div
          key={task.id}
          className="timeline-item p-2 border-l-4 border-blue-500 mb-4"
        >
          <p className="font-bold">{task.title}</p>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
}
