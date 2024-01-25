import React from "react";
import PropTypes from "prop-types";

TodoItemsRemainig.props = {
  remaining: PropTypes.number.isRequired,
};

function TodoItemsRemainig(props) {
  return <span>{props.remaining} items remaining</span>;
}

export default TodoItemsRemainig;
