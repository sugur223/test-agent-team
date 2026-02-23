"use client";

import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || loading) return;

    setLoading(true);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });

    if (res.ok) {
      const todo: Todo = await res.json();
      setTodos((prev) => [todo, ...prev]);
      setNewTitle("");
    }
    setLoading(false);
  }

  async function toggleTodo(id: number, completed: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    if (res.ok) {
      const updated: Todo = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    }
  }

  async function deleteTodo(id: number) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });

    if (res.ok) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div>
      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500"
        />
        <button
          type="submit"
          disabled={loading || !newTitle.trim()}
          className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                className="h-5 w-5 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-100"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-zinc-400 line-through dark:text-zinc-600"
                    : "text-zinc-900 dark:text-zinc-50"
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400"
                aria-label="Delete todo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
