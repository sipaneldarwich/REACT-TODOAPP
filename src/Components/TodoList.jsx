import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoFilter from "./TodoFilter";
import TodoItemsRemainig from "./TodoItemsRemainig";
import TodoCompleteAllTodos from "./TodoCompleteAllTodos";
import TodoClearCompleted from "./TodoClearCompleted";

TodoList.props = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  todosFiltered: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
function TodoList(props) {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                defaultChecked={todo.isCompleted}
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isCompleted ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.toggleEdit(todo.id)}
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
                  onBlur={(event) => props.updateTodo(event, todo.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      props.updateTodo(event, todo.id);
                    } else if (event.key === "Escape") {
                      props.toggleEdit(todo.id);
                    }
                  }}
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button
              className="x-button"
              onClick={() => props.deleteTodo(todo.id)}
            >
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
        <TodoCompleteAllTodos completeAllTodos={props.completeAllTodos} />
        <TodoItemsRemainig remaining={props.remaining} />
      </div>

      <div className="other-buttons-container">
        <TodoFilter
          todosFiltered={props.todosFiltered}
          filter={filter}
          setFilter={setFilter}
        />
        <TodoClearCompleted clearCompleted={props.clearCompleted} />
      </div>
    </>
  );
}

export default TodoList;
