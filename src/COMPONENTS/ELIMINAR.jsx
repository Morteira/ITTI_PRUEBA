import React, { useState, useEffect, useRef } from "react";

const ELIMINAR = () => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    setVisibleTodos(todos.slice(0, 7));
  }, [todos]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      setVisibleTodos((prevVisibleTodos) => {
        const lastVisibleIndex = prevVisibleTodos.length - 1;
        const nextVisibleIndex = lastVisibleIndex + 1;
        const nextVisibleTodos = todos.slice(0, nextVisibleIndex + 7);
        return nextVisibleTodos;
      });
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setVisibleTodos(updatedTodos.slice(0, 7));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setMessage("!Item eliminado correctamente!");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <div className="container mt-4">
      <h1>Eliminar Tareas</h1>
      {message && (
        <div className="message success">{message}</div>
      )}
      <div
        style={{ height: "300px", overflowY: "scroll" }}
        onScroll={handleScroll}
        ref={containerRef}
      >
        <ul className="list-group">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{todo.title}</span>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(todo.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ELIMINAR;
