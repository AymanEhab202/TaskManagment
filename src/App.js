import { useSelector, useDispatch } from "react-redux";
import { add, remove, edit, toggleDone } from "./features/tasks/tasksSlice";
import { fetchTasks } from "./features/tasks/tasksSlice";
import { useEffect } from "react";

function App() {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  console.log(tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="App">
      <div>
        <label>Task Title</label>
        <input type="text" id="inputValue" />
        <button
          onClick={() => {
            const inputValue = document.getElementById("inputValue").value;
            dispatch(add(inputValue));
          }}
        >
          Add Task
        </button>
      </div>
      <table border={5} style={{ width: "100%" }} className="mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Done</th>
            <th>Remove Task</th>
            <th>Edit Task</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>{++i}</td>
              <td>{task.title}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(toggleDone({ id: --i, completed: task.completed }))
                }
              >
                {task.completed ? "True" : "False"}
              </td>
              <td>
                <button onClick={() => dispatch(remove(--i))}>Remove</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    const inputValue =
                      document.getElementById("inputValue").value;
                    dispatch(edit({ title: inputValue, id: --i }));
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
