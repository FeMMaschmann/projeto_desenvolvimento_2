import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto my-menu-nav">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/map">Mapa</Link>
          </div>
          <div>
            <Link to="/register">Cadastre-se</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
