import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { computeHeadingLevel } from "@testing-library/react";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "fix laptop",
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "pay bills",
      isCompleted: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "learn react",
      isCompleted: false,
      isEditing: false,
    },
  ]);

  const [todoInput, setTodoInput] = useState("");
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isCompleted: false,
        isEditing: false,
      },
    ]);

    setTodoInput("");
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  }
  function handleChange(event) {
    setTodoInput(event.target.value);
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function toggleEdit(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    toggleEdit(id);
    if (event.target.value.trim().length == 0) {
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = event.target.value;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            onChange={handleChange}
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  defaultChecked={todo.isCompleted}
                  onChange={() => completeTodo(todo.id)}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => toggleEdit(todo.id)}
                    className={`todo-item-label ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="todo-item-input"
                    onBlur={(event) => updateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        updateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        toggleEdit(todo.id);
                      }
                    }}
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
