import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/map">Mapa</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/register">Cadastre-se</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/login">Login</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
