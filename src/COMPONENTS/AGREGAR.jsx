import React, { useState, useEffect } from "react";
import "../App.css";

const Message = ({ type, text }) => {
  let className = "message";

  if (type === "success") {
    className += " success";
  } else if (type === "error") {
    className += " error";
  } else {
    className += " alternate";
  }

  return <div className={className}>{text}</div>;
};

const AGREGAR = () => {
  const [newTodo, setNewTodo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\d+$/.test(newTodo)) {
      setMessage("No se pueden ingresar números");
    } else if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        completed: completed,
      };
      const storedTodos = localStorage.getItem("todos");
      let todos = [];
      if (storedTodos) {
        todos = JSON.parse(storedTodos);
      }
      todos.unshift(newTodoItem);
      localStorage.setItem("todos", JSON.stringify(todos));
      setNewTodo("");
      setCompleted(false);
      setMessage("¡Elemento agregado correctamente!");
    } else {
      setMessage("Error al agregar el elemento");
    }
  };

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  return (
    <div className="container mt-4">
      <h1>Agregar Nuevo Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newTodo">Nuevo Item:</label>
          <input
            type="text"
            className="form-control"
            id="newTodo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            pattern="[A-Za-z\s]+"
            title="No se permiten números"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={completed}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="completed">
            {completed ? "Completado" : "Pendiente"}
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
      {message && (
        <Message
          type={
            message === "¡Elemento agregado correctamente!"
              ? "success"
              : message === "Error al agregar el elemento" ||
                message === "No se pueden ingresar números"
              ? "error"
              : "alternate"
          }
          text={message}
        />
      )}
    </div>
  );
};

export default AGREGAR;
