import React, { useState, useEffect, useRef } from "react";

const Message = ({ type, text, onClose }) => {
  let className = "message";

  if (type === "success") {
    className += " success";
  } else if (type === "error") {
    className += " error";
  } else {
    className += " alternate";
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <div className={className}>{text}</div>;
};

const MODIFICAR = () => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    setVisibleTodos(todos.slice(0, 7));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
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

  const handleUpdate = (id, updatedTitle, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle, completed } : todo
      )
    );
  };

  const handleClick = (id, title, completed) => {
    handleUpdate(id, title, completed);
    setMessage("¡Elemento actualizado correctamente!");
  };

  const handleCloseMessage = () => {
    setMessage("");
  };

  return (
    <div>
      {message && (
        <Message
          type="success"
          text="¡Elemento actualizado correctamente!"
          onClose={handleCloseMessage}
        />
      )}
      <main
        className="d-flex justify-content-center"
        style={{ marginTop: "20px", height: "400px", overflowY: "scroll" }}
        onScroll={handleScroll}
        ref={containerRef}
      >
        <ul className="list-group"
           style={{ 
            marginTop: '20px',
            marginLeft: '20px',
            marginRight: '20px', 
            height: '550px',
            width: '100%', 
            overflowY: 'scroll'
           }}
        >
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="list-group-item mb-3">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control mr-2"
                  value={todo.title}
                  onChange={(e) =>
                    handleUpdate(todo.id, e.target.value, todo.completed)
                  }
                />
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="form-check-input"
                    onChange={(e) =>
                      handleUpdate(todo.id, todo.title, e.target.checked)
                    }
                  />
                  <label className="form-check-label">
                    {todo.completed ? "Completado" : "Pendiente"}
                  </label>
                </div>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() =>
                    handleClick(todo.id, todo.title, todo.completed)
                  }
                >
                  Actualizar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MODIFICAR;
