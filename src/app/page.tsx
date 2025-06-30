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
        {todos.map((td) => (
          <li key={td.id} className="flex justify-between py-2 border-b text-black">
            <span>{td.title}</span>
            <span>{td.completed ? "✅" : "🕓"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}