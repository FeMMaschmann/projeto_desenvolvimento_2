import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const rootUrl = "http://localhost:3001/";

const registerUser = async (data: RegisterData) => {
  console.log(data);
  try {
    await axios.post("users/test", data, {
      baseURL: rootUrl,
    });
  } catch (error) {
    console.log(error);
  }
};

const isRegisterDataValid = (RegisterData: RegisterData) => {
  if (RegisterData.firstName.length < 2) return false;
  if (RegisterData.lastName.length < 2) return false;
  if (RegisterData.email.length < 2) return false;
  if (RegisterData.password.length < 3) return false;
  if (RegisterData.passwordConfirm.length < 3) return false;
  if (RegisterData.password !== RegisterData.passwordConfirm) return false;
  return true;
};

export default function Register() {
  const [data, setData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const canSend = isRegisterDataValid(data);

  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="my-h1">Cadastro</h1>
        <div className="my-form">
          <Form>
            <Form.Group className="mb-3 row">
              <div className="col-sm">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setData({
                      ...data,
                      firstName: e.target.value,
                    });
                  }}
                  value={data.firstName}
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="col-sm">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setData({
                      ...data,
                      lastName: e.target.value,
                    });
                  }}
                  value={data.lastName}
                  placeholder="Digite seu sobrenome"
                />
              </div>
            </Form.Group>
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
              <div className="col-sm">
                <Form.Label>Repetir senha</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => {
                    setData({
                      ...data,
                      passwordConfirm: e.target.value,
                    });
                  }}
                  value={data.passwordConfirm}
                  placeholder="Repita sua senha"
                />
              </div>
            </Form.Group>
            <Button
              variant="primary"
              disabled={!canSend}
              type="button"
              onClick={() => {
                registerUser(data);
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
