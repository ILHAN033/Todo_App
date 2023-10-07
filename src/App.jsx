import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  let filtered;

  if (filter === "All") filtered = todos;

  if (filter === "Completed") filtered = todos.filter((item) => item.completed);

  if (filter === "Not Completed")
    filtered = todos.filter((item) => item.completed === false);

  function getData() {
    fetch("https://dummyjson.com/todos").then((res) =>
      res.json().then((data) => {
        console.log(data.todos);
        setTodos(data.todos);
      })
    );
  }

  function addItems() {
    const newItem = { id: Date.now(), todo: input };
    setTodos((todos) => [...todos, newItem]);
    setInput("");
  }

  function delItems(id) {
    setTodos((todos) => todos.filter((item) => item.id !== id));
  }

  useEffect(() => getData, []);
  return (
    <div>
      <div
        className="flex justify-center items-center h-28 gap-2"
        style={{ backgroundColor: "#212121" }}
      >
        <h1 className=" text-3xl font-extrabold text-orange-400">TODO APP</h1>
        <input
          type="text"
          placeholder="Items..."
          className="rounded-lg w-56 h-8 outline-none"
          value={input}
          style={{ paddingLeft: "10px" }}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className=" rounded-3xl bg-blue-300 w-20 h-8"
          onClick={addItems}
        >
          Add
        </button>
        <select
          value={filter}
          className="rounded-lg outline-none px-4"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Not Completed</option>
        </select>
      </div>
      <div>
        {filtered.map((item) => (
          <div
            className="flex gap-5 mt-8 justify-between px-4 py-3 "
            key={item.id}
            style={{
              border: "2px solid",
              borderRadius: "10px",
              height: "60px",
            }}
          >
            <p key={item.id}>{item.todo}</p>
            <button
              className="bg-red-500 rounded-3xl w-20 h-8"
              onClick={() => delItems(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
