import React from "react";
import PropTypes from "prop-types";

TodoItemsRemainig.props = {
  remaining: PropTypes.func.isRequired,
};

function TodoItemsRemainig(props) {
  return <span>{props.remaining()} items remaining</span>;
}

export default TodoItemsRemainig;
