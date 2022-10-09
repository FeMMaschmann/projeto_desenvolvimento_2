import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Map from "./components/Map";
import Login from "./components/Login";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
