import { TypesLogged, TypesLoginData } from "../types/types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "./Menu";

export default function Account(props: TypesLogged & TypesLoginData) {
  return (
    <>
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
      <div className="container">
        <div className="my-form">
          <h1 className="my-h1">Minha conta</h1>
          <div className="my-account-div">
            <Link to="/AccAdress">
              <Button>Alterar meu endereço</Button>
            </Link>
            <Link to="/NewInstallation">
              <Button>Registrar nova instalação</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
