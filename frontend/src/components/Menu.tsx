import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TypesLogged, TypesLoginData } from "../types/types";

export default function Menu(props: TypesLogged & TypesLoginData) {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto my-menu-nav">
          {props.isLogged ? (
            <>
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/map">Mapa</Link>
              </div>
              <div>
                <Link to="/account">Minha Conta</Link>
              </div>
              <div className="my-account-menu">
                <p>Olá, {props.loggedData.FirstName}</p>
                <p>‎ | ‎</p>
                <p
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
                </p>
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
