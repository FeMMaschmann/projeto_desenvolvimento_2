import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import { baseURL, LoginData } from "../types/types";

const loginUser = async (data: LoginData) => {
  console.log(data);
  try {
    const user = await axios.post("users/test", data, {
      baseURL: baseURL,
    });
    alert(user);
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
  }
};

const isRegisterDataValid = (RegisterData: LoginData) => {
  if (RegisterData.email.length < 2) return false;
  if (RegisterData.password.length < 3) return false;
  return true;
};

export default function Login() {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const canSend = isRegisterDataValid(data);

  return (
    <>
      <Menu />
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
            <Button
              variant="primary"
              disabled={!canSend}
              type="button"
              onClick={() => {
                loginUser(data);
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
