"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: "Finish assignment",
      completed: false,
    },
    {
      id: 2,
      text: "Study Next.js",
      completed: false,
    },
    {
      id: 3,
      text: "Setup Git repository",
      completed: true,
    },
  ]);

  const [taskInput, setTaskInput] = useState("");

  // ADD TASK
  function addTask() {
    if (taskInput.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  }

  // COMPLETE / UNCOMPLETE TASK
  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  // DELETE TASK
  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">

        {/* TITLE */}
        <h1 className="mb-6 text-center text-3xl font-bold">
          TODO APPLICATION
        </h1>

        {/* INPUT AND ADD BUTTON */}
        <div className="mb-6 flex gap-2">

          <input
            type="text"
            placeholder="Enter a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 p-3"
          />

          <button
            onClick={addTask}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Add Task
          </button>

        </div>

        {/* TASK LIST */}
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="mb-3 flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >

              {/* CHECKBOX AND TASK */}
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5"
                />

                <span
                  className={
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }
                >
                  {task.text}
                </span>

              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}