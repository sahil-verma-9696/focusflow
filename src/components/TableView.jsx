export default function TableView({ tasks , updateItem, deleteItem }) {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="border">
              <td className="p-2 border">{task.title}</td>
              <td className="p-2 border">{task.description}</td>
              <td className="p-2 border">{task.status}</td>
              <td className="p-2 border">{task.dueDate}</td>
              <td className="p-2 border">
                <button onClick={() => deleteItem(task.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }