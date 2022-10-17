import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import {
  baseURL,
  LoginData,
  TypesLogged,
  TypesLoginData,
} from "../types/types";
import { Link, useNavigate } from "react-router-dom";

const loginUser = async (data: LoginData) => {
  try {
    const user = await axios.post("users/login", data, {
      baseURL: baseURL,
    });
    return user.data[0];
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
  }
};

const isRegisterDataValid = (LoginData: LoginData) => {
  if (LoginData.email.length < 2) return false;
  if (LoginData.password.length < 3) return false;
  return true;
};

export default function Login(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const canSend = isRegisterDataValid(data);

  return (
    <>
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
      <div className="container">
        <h1 className="my-h1">Login</h1>
        <div className="my-form">
          <Form>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  value={data.email}
                  placeholder="Digite seu e-mail"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => {
                    setData({
                      ...data,
                      password: e.target.value,
                    });
                  }}
                  value={data.password}
                  placeholder="Digite sua senha"
                />
              </div>
            </Form.Group>
            <p>
              Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>
            <Button
              variant="primary"
              disabled={!canSend}
              type="button"
              onClick={() => {
                loginUser(data).then(function (result) {
                  props.setLoggedData(result);
                  props.setIsLogged(true);
                });
                console.log(props.loggedData);
                navigate("../Map");
              }}
            >
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
