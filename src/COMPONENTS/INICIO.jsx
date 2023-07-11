import React, { useState, useEffect, useRef } from 'react';
import '../index.css'

const INICIO = () => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      const api = 'https://jsonplaceholder.typicode.com/todos';
      fetch(api)
        .then(response => response.json())
        .then(json => {
          setTodos(json);
        })
        .catch(err => console.log('Solicitud fallida', err));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setVisibleTodos(todos.slice(0, 7));
  }, [todos]);

  useEffect(() => {
    filterVisibleTodos();
  }, [showCompleted, showIncomplete]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      setVisibleTodos(prevVisibleTodos => {
        const lastVisibleIndex = prevVisibleTodos.length - 1;
        const nextVisibleIndex = lastVisibleIndex + 1;
        const nextVisibleTodos = todos.slice(0, nextVisibleIndex + 5);
        return nextVisibleTodos;
      });
    }
  };

  const handleCheckboxChange = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filterVisibleTodos = () => {
    setVisibleTodos(
      todos
        .filter(todo => {
          if (todo.completed && showCompleted) {
            return true;
          } else if (!todo.completed && showIncomplete) {
            return true;
          }
          return false;
        })
        .slice(0, 7)
    );
  };

  const handleShowCompletedClick = () => {
    setShowCompleted(!showCompleted);
    setVisibleTodos(todos.filter(todo => todo.completed === showCompleted));
  };
  
  const handleShowIncompleteClick = () => {
    setShowIncomplete(!showIncomplete);
    setVisibleTodos(todos.filter(todo => todo.completed !== showCompleted));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className={`btn btn-primary mb-3 ${showCompleted ? 'active' : ''}`}
          onClick={handleShowCompletedClick}
          style={{ maxWidth: '20%', width: '100%', marginRight: '5px' ,marginTop: '20px'}}
        >
          Completados
        </button>
        <button
          type="button"
          className={`btn btn-primary mb-3 ${showIncomplete ? 'active' : ''}`}
          onClick={handleShowIncompleteClick}
          style={{ maxWidth: '20%', width: '100%', marginLeft: '5px' ,marginTop: '20px'}}
        >
          No Completados
        </button>
      </div>
      <main
        className="d-flex justify-content-center"
        style={{
          marginTop: '20px',
          height: '500px',
          overflowY: 'scroll'
        }}
        onScroll={handleScroll}
        ref={containerRef}
      >
        <ul
          className="list-group"
          style={{
            marginTop: '20px',
            marginLeft: '20px',
            marginRight: '20px',
            height: '500px',
            width: '100%',
            overflowY: 'scroll'
          }}
        >
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={`list-group-item ${!todo.completed ? 'incomplete' : ''}`}
            >
              <h5 style={todo.completed ? { textDecoration: 'line-through' } : {}}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                  className="form-check-input"
                />
                {todo.title}
              </h5>
              <div className="form-check">
                <label className="form-check-label">
                  {todo.completed ? 'Completado' : 'Pendiente'}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default INICIO;
