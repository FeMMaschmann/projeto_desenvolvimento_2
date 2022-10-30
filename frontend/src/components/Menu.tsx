import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TypesLogged, TypesLoginData } from "../types/types";
// @ts-ignore: Unreachable code error
import logoInstaller from "../img/logoInstallerBorderless.svg";

export default function Menu(props: TypesLogged & TypesLoginData) {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" variant="light" className="my-menu">
      <Container>
        <Navbar.Brand>
          <img src={logoInstaller} className="my-logo" alt="APP Logo" />
        </Navbar.Brand>
        <Nav className="me-auto my-menu-nav">
          {props.isLogged ? (
            <>
              <div>
                <Link to="/map">Mapa</Link>
              </div>
              <div>
                <Link to="/account">Minha Conta</Link>
              </div>
              <div className="my-account-menu">
                <p>Olá, {props.loggedData.FirstName}</p>
                <p>‎ | ‎</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  onClick={() => {
                    props.setIsLogged(false);
                    props.setLoggedData({
                      Id: 0,
                      FirstName: "",
                      LastName: "",
                      Email: "",
                      BusinessName: "",
                    });
                    navigate("../Map");
                  }}
                >
                  Sair
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/map">Mapa</Link>
              </div>
              <div>
                <Link to="/login">Fazer Login</Link>
              </div>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
