import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import INICIO from "./COMPONENTS/INICIO";
import Agregar from "./COMPONENTS/AGREGAR";
import Eliminar from "./COMPONENTS/ELIMINAR";
import Modificar from "./COMPONENTS/MODIFICAR";
import "./App.css";
function App() {
  return (
    <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                  <a className="navbar-brand" href="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          Prueba ITTI
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          Inicio
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/crear">
                          Agregar
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/modificar">
                          Modificar
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/eliminar">
                          Eliminar
                        </Link>
                      </li>
                    </ul>
                    <span className="navbar-text">|| CARLOS MORTEIRA ||</span>
                  </div>
            </nav>


      <Routes>
        <Route path="/" element={<INICIO />} />
        <Route path="/crear" element={<Agregar />} />
        <Route path="/eliminar" element={<Eliminar />} />
        <Route path="/modificar" element={<Modificar />} />
      </Routes>
    </div>

  );
}

export default App;
