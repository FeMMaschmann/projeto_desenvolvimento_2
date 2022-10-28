import { TypesLogged, TypesLoginData } from "../types/types";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Menu from "./Menu";

type adressData = {
  ZipCode: string;
  Street: string;
  AdressNumber: string;
  District: string;
  City: string;
  State: string;
};

export default function AccAdress(props: TypesLogged & TypesLoginData) {
  const [data, setData] = useState<adressData>({
    ZipCode: "",
    Street: "",
    AdressNumber: "",
    District: "",
    City: "",
    State: "",
  });

  return (
    <>
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
      <h1>Minha conta</h1>
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
                    ZipCode: e.target.value,
                  });
                }}
                value={data.ZipCode}
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
                    Street: e.target.value,
                  });
                }}
                value={data.Street}
                placeholder="Digite seu sobrenome"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row">
            <div className="col-sm">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setData({
                    ...data,
                    Street: e.target.value,
                  });
                }}
                value={data.Street}
                placeholder="Digite sua rua"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 row">
            <div className="col-sm">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setData({
                    ...data,
                    District: e.target.value,
                  });
                }}
                value={data.District}
                placeholder="Digite seu bairro"
              />
            </div>
            <div className="col-sm">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setData({
                    ...data,
                    City: e.target.value,
                  });
                }}
                value={data.City}
                placeholder="Digite sua cidade"
              />
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
