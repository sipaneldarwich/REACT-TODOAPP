import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
function TodoForm(props) {
  const [todoInput, setTodoInput] = useState("");

  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }
    setTodoInput("");
    props.addTodo(todoInput);
  }

  function handleChange(event) {
    setTodoInput(event.target.value);
  }

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        type="text"
        className="todo-input"
        onChange={handleChange}
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
