import React, { useState } from "react";

// Todo Component definition
function Todo() {
  // Setting the states for task and newTask
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  //FUnction to add a new task
  const addTask = () => {
    // Check if newTask is not just empty spaces
    if (newTask.trim() !== "") {
      // Create a new task object using the time as the unique id
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        important: false,
      };
      // Add new task to tasks array and reset newTask input
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  // Function to toggle the completion status of a task
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to toggle the importance of a task and reorder the list
  const toggleImportant = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, important: !task.important } : task
    );

    // Sort tasks: important tasks first, preserving original order among tasks with equal importance
    updatedTasks.sort((a, b) => {
      if (a.important === b.important) {
        return a.id - b.id; // preserve original order among equal importance
      }
      return b.important - a.important; // important tasks first
    });

    setTasks(updatedTasks);
  };

  // Function to clear all tasks
  const clearAllTasks = () => {
    setTasks([]); // Clearing all tasks
  };

  //Function to delete specific tasks
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to get tasks based on the current filter
  const getFilteredTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "important":
        return tasks.filter((task) => task.important);
      default:
        return tasks;
    }
  };

  return (
    <div className="wrapper">
      <div className="task-input">
        <div className="input-container">
          <img src="bars-icon.svg" alt="icon" className="input-icon" />
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="submit-btn" type="button" onClick={addTask}>
            Submit
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="filters">
          <span
            id="all"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
          >
            All
          </span>
          <span
            id="pending"
            onClick={() => setFilter("pending")}
            className={filter === "pending" ? "active" : ""}
          >
            Pending
          </span>
          <span
            id="completed"
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </span>
          <span
            id="important"
            onClick={() => setFilter("important")}
            className={filter === "important" ? "active" : ""}
          >
            Important
          </span>
        </div>
        <button className="clear-btn" onClick={clearAllTasks}>
          Clear All
        </button>
      </div>

      <ul className="task-box">
        {getFilteredTasks().map((task) => (
          <li
            className={`task ${task.completed ? "completed" : ""} ${
              task.important ? "important" : ""
            }`}
            key={task.id}
            style={{ opacity: task.important ? 0.6 : 1 }}
          >
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <p
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </p>
              <button
                className="important-btn"
                onClick={() => toggleImportant(task.id)}
              >
                {task.important ? "Unmark as Important" : "Mark as Important"}
              </button>
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>{" "}
              {/* Delete button */}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
