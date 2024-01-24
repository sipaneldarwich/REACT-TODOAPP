import React from "react";
import PropTypes from "prop-types";

TodoClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};
function TodoClearCompleted(props) {
  return (
    <div>
      <button onClick={props.clearCompleted} className="button">
        Clear completed
      </button>
    </div>
  );
}

export default TodoClearCompleted;
