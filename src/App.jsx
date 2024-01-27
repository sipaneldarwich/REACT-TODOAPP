import "./App.css";
import { useEffect, useMemo, useState, useRef } from "react";
import NoTodos from "./Components/NoTodos";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import useLocalStorage from "./hooks/useLoalStorage";

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos',[]);

  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

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

  function todosFiltered(filter) {
    if (filter === "all") {
      return todos;
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.isCompleted);
    }
    if (filter === "active") {
      return todos.filter((todo) => !todo.isCompleted);
    }
  }

  function remainingCalculation() {
    return todos.filter((todo) => !todo.isCompleted).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function completeAllTodos() {
    console.log("x");
    const updatedTodos = todos.map((todo) => {
      todo.isCompleted = true;
      return todo;
    });
    setTodos(updatedTodos);
  }

  function clearCompleted() {
    const updatedTodos = todos.filter((todo) => todo.isCompleted === false);
    setTodos(updatedTodos);
  }

  useEffect(() => {
    nameInputEl.current.focus();
    return function cleanup(){
      //cleanup function
    };
  });

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              className="todo-input"
              placeholder="What is your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
            todosFiltered={todosFiltered}
            remaining={remaining}
            completeAllTodos={completeAllTodos}
            clearCompleted={clearCompleted}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
