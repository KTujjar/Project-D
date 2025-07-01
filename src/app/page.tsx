"use client";
import { useState, useEffect } from "react";

type Todo = { id: number; title: string; completed: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos").then(r => r.json()).then(setTodos);
  }, []);


  const add = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };


  const updateComplete = async (todo: Todo) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === updated.id ? updated : t));
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(t => t.id !== id));
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-black mb-4">To‑Do List</h1>

      <div className="flex mb-4">
        <input
          className="flex-grow border rounded px-2 py-1 text-black"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={add} className="ml-2 bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      <ul>
        {todos.map(td => (
          <li key={td.id} className="flex justify-between py-2 border-b text-black">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={td.completed}
                onChange={() => updateComplete(td)}
                className="mr-2"
              />
              <span className={td.completed ? "line-through text-gray-500" : ""}>
                {td.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(td.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}