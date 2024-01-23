import React from "react";
import PropTypes from "prop-types";

TodoList.props = {
  todos:PropTypes.array.isRequired,
  completeTodo:PropTypes.func.isRequired,
  updateTodo:PropTypes.func.isRequired,
  deleteTodo:PropTypes.func.isRequired,
  toggleEdit:PropTypes.func.isRequired,
}
function TodoList(props) {
  return (
    <>
      <ul className="todo-list">
        {props.todos.map((todo) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                defaultChecked={todo.isCompleted}
                onChange={() => props.completeTodo(todo.id)}
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
            <button className="x-button" onClick={() => props.deleteTodo(todo.id)}>
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
    </>
  );
}

export default TodoList;
