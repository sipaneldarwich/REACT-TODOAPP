import React from "react";
import PropTypes from "prop-types";

TodoCompleteAllTodos.props = {
  completeAllTodos: PropTypes.func.isRequired,
};

function TodoCompleteAllTodos(props) {
  return (
    <div>
      <div onClick={() => props.completeAllTodos()} className="button">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;
