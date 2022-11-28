import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";
import Register from "./components/Register";
import Map from "./components/Map";
import Login from "./components/Login";
import Account from "./components/Account";
import AccAdress from "./components/AccAdress";
import Installations from "./components/Installations";
import NewInstallation from "./components/NewInstallation";
import Perfil from "./components/Perfil";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedData, setLoggedData] = useState({
    Id: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    BusinessName: "",
  });
  const [perfil, setPerfil] = useState({
    Id: 0,
    BusinessName: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Map
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
              perfil={perfil}
              setPerfil={setPerfil}
            />
          }
        ></Route>
        <Route
          path="/map"
          element={
            <Map
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
              perfil={perfil}
              setPerfil={setPerfil}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Register
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/accAdress"
          element={
            <AccAdress
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/installations"
          element={
            <Installations
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/newInstallation"
          element={
            <NewInstallation
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
            />
          }
        ></Route>
        <Route
          path="/perfil"
          element={
            <Perfil
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
              perfil={perfil}
              setPerfil={setPerfil}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
