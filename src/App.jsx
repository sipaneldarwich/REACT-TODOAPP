import "./App.css";
import { useState } from "react";
import NoTodos from './Components/NoTodos';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
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

  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(todoTitle) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoTitle,
        isCompleted: false,
        isEditing: false,
      },
    ]);
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
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
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
