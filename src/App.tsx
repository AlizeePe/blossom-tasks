// Library
import { useState, useEffect } from "react";

// Types
import type { Task, Filter } from "./types";

// Components
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import FilterBar from "./components/FilterBar/FilterBar";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

// Load and parse tasks from localStorage
function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem("blossom-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Failed to parse tasks from localStorage:", error);
    localStorage.removeItem("blossom-tasks");
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [text, setText] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  // Sync tasks with localStorage on every change
  useEffect(() => {
    localStorage.setItem("blossom-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) {
      return;
    }
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText("");
  }

  function completeTask(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id: number, newText: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task,
    );
    setTasks(updatedTasks);
  }

  // Remove all completed tasks
  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  function getFilteredTasks(): Task[] {
    switch (activeFilter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  const filteredTasks = getFilteredTasks();
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <main>
      <Header />
      <TaskForm text={text} onTextChange={setText} onSubmit={addTask} />
      <FilterBar activeFilter={activeFilter} onFilterSelect={setActiveFilter} />
      <TaskList
        items={filteredTasks}
        onComplete={completeTask}
        onRemove={removeTask}
        onEdit={editTask}
      />
      <Footer pendingCount={pendingCount} onClearCompleted={clearCompleted} />
    </main>
  );
}

export default App;
